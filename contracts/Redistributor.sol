pragma solidity ^0.7.0;

import "hardhat/console.sol";

import "./DaiToken.sol";

contract Redistributor {
    string public version = "0.0.0";

    uint256 public sum; // total money accumulated into the system
    DaiToken public daiToken;

    struct User {
        address payable addr; // address of the user
        string fullName; // full name of the user
        uint256 createdAt; // enrollment date
    }

    User public admin; //  admin user details
    mapping(address => bool) public isUserEnrolled; // checks if user is enrolled in the redistribution program
    User[] public users; // list of all participating users

    modifier adminOnly {
        require(
            admin.addr == address(0x0) || msg.sender == admin.addr,
            "Not authorized: You must be an admin to perform this operation"
        );
        _;
    }

    modifier enrolledOnly {
        require(isUserEnrolled[msg.sender], "Not authorized: You must be enrolled to perform this operation");
        _;
    }

    constructor(string memory _adminName, DaiToken _daiToken) {
        // yield to the contract creator
        yield(msg.sender, _adminName);
        // initialise DaiToken
        // daiToken = DaiToken(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
        // daiToken = new DaiToken();
        daiToken = _daiToken;
    }

    /// Give admin access to new account. This is necessary
    // in case of transfer of power. The action is irreversible.
    function yield(address payable _newAdminAddr, string memory _newAdminName) public adminOnly {
        admin = User(_newAdminAddr, _newAdminName, block.timestamp);
        enroll(_newAdminAddr, _newAdminName);
    }

    /// Enroll new user
    function enroll(address payable _userAddr, string memory _userName) public {
        // proceed if user is not already marked as enrolled
        if (!isUserEnrolled[_userAddr]) {
            User memory newUser = User(_userAddr, _userName, block.timestamp);
            // add user to the list of participating users
            users.push(newUser);
            // mark user as enrolled
            isUserEnrolled[_userAddr] = true;
        } else {
            console.log("The User is already enrolled");
        }
    }

    /// Kill the contract
    function kill() public adminOnly {
        require(admin.addr != address(0x0), "The admin is not initialised");
        selfdestruct(admin.addr);
    }

    /// Donate
    function donate(uint256 _amount) public enrolledOnly {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer Mock DAI tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        sum = sum + _amount;
        // emit transaction event
    }

    /// Redistribute
    function redistribute() public adminOnly {
        if (sum <= 0) return;
        uint256 reward = sum / users.length;
        for (uint256 i = 0; i < users.length; i++) {
            if (reward > 0) daiToken.transfer(users[i].addr, reward);
        }
        // emit redistribution event
    }
}
