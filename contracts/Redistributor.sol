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

    constructor(string memory _adminName) {
        // make contract initiator the admin
        admin = User(msg.sender, _adminName, block.timestamp);
        // add admin to the list of participating users
        users.push(admin);
        // mark admin as enrolled
        isUserEnrolled[msg.sender] = true;
    }
}
