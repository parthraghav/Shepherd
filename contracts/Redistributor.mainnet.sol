pragma solidity ^0.7.0;

// Adding only the ERC-20 function we need
interface DaiToken {
    function transfer(address dst, uint256 wad) external returns (bool);

    function balanceOf(address guy) external view returns (uint256);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    function approve(address _spender, uint256 _value) external returns (bool success);
}

contract Redistributor {
    string public version = "0.0.0";

    uint256 public sum; // total money accumulated into the system
    DaiToken public daiToken;
    string currentCurrency = "DAI";

    struct User {
        address payable addr; // address of the user
        string fullName; // full name of the user
        uint256 createdAt; // enrollment date
    }

    User public admin; //  admin user details
    mapping(address => bool) public isUserEnrolled; // checks if user is enrolled in the redistribution program
    User[] public users; // list of all participating users

    enum TransactionType { Donation, Redistribution }

    event Transaction(
        address indexed beneficiary,
        address indexed remitter,
        uint256 emittedAt,
        TransactionType indexed transactionType,
        uint256 amount,
        string currency
    );

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

    constructor(string memory _adminName) {
        // yield to the contract creator
        yield(msg.sender, _adminName);
        // initialise DaiToken
        daiToken = DaiToken(0x6B175474E89094C44Da98b954EedeAC495271d0F);
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
        require(!isUserEnrolled[_userAddr], "The User is already enrolled");
        User memory newUser = User(_userAddr, _userName, block.timestamp);
        // add user to the list of participating users
        users.push(newUser);
        // mark user as enrolled
        isUserEnrolled[_userAddr] = true;
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
        emit Transaction(
            address(this),
            msg.sender,
            block.timestamp,
            TransactionType.Donation,
            _amount,
            currentCurrency
        );
    }

    /// Redistribute
    function redistribute() public adminOnly {
        if (sum <= 0) return;
        uint256 reward = sum / users.length;
        sum = 0;
        for (uint256 i = 0; i < users.length; i++) {
            if (reward > 0) {
                // redistribute to each user
                daiToken.transfer(users[i].addr, reward);
                // emit redistribution event
                emit Transaction(
                    users[i].addr,
                    address(this),
                    block.timestamp,
                    TransactionType.Redistribution,
                    reward,
                    currentCurrency
                );
            }
        }
    }
}
