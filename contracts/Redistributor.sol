pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract Redistributor {
    string public version = "0.0.0";

    struct User {
        address payable addr; // address of the user
        string fullName; // full name of the user
        uint256 createdAt; // enrollment date
    }

    User public admin; //  admin user details
    mapping(address => bool) public isUserEnrolled; // checks if user is enrolled in the redistribution program
    User[] public users; // list of all participating users

    modifier adminOnly {
        require(admin.addr == address(0x0) || msg.sender == admin.addr, "Not admin: You're not authorized");
        _;
    }

    constructor(string memory _adminName) {
        // yield to the contract creator
        yield(msg.sender, _adminName);
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
}
