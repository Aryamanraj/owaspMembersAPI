// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OWASPrgiptMembers {
    
    mapping(address => bool) public isAdmin;
    mapping(string => User) public users;
    string[] public allRollNumbers;

    struct User {
        string name;
        string email;
        uint64 phone;
        string branch;
        string fileCID;
        bool approved;
    }

    event UserSet(
        string rollNo,
        string name,
        string email,
        uint64 phone,
        string branch,
        string fileCID
    );

    event UserRemoved(string rollNo);
    event UserApproved(string rollNo, bool approvedStatus);
    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can call this function");
        _;
    }

    constructor() {
        isAdmin[msg.sender] = true;
        emit AdminAdded(msg.sender);
    }

    function setUser(
        string memory _rollNo,
        string memory _name, 
        string memory _email, 
        uint64 _phone, 
        string memory _branch, 
        string memory _fileCID
    ) public {
        require(bytes(_rollNo).length == 8, "Roll number must be 8 characters long!");
        require(bytes(users[_rollNo].name).length == 0, "Roll number already registered!");

        users[_rollNo] = User({
            name: _name, 
            email: _email, 
            phone: _phone, 
            branch: _branch, 
            fileCID: _fileCID, 
            approved: false
        });
        
        allRollNumbers.push(_rollNo);
        emit UserSet(_rollNo, _name, _email, _phone, _branch, _fileCID);
    }

    function getUserByRollNo(string memory _rollNo) external view returns (
        string memory name,
        string memory email,
        uint64 phone,
        string memory branch,
        string memory fileCID,
        bool approved
    ) {
        User storage user = users[_rollNo];
        require(bytes(user.name).length > 0, "User does not exist!");
        return (user.name, user.email, user.phone, user.branch, user.fileCID, user.approved);
    }

    function isUserApproved(string memory _rollNo) external view returns (bool) {
        return users[_rollNo].approved;
    }

    function addAdmin(address _newAdmin) external onlyAdmin {
        require(!isAdmin[_newAdmin], "Address is already an admin");
        isAdmin[_newAdmin] = true;
        emit AdminAdded(_newAdmin);
    }

    function removeAdmin(address _admin) external onlyAdmin {
        require(isAdmin[_admin], "Address is not an admin");
        require(msg.sender != _admin, "Admin cannot remove themselves");
        isAdmin[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function setApprovalStatus(string memory _rollNo, bool _status) external onlyAdmin {
        User storage user = users[_rollNo];
        require(bytes(user.name).length > 0, "User does not exist!");
        user.approved = _status;
        emit UserApproved(_rollNo, _status);
    }

    function deleteUser(string memory _rollNo) external onlyAdmin {
        require(bytes(users[_rollNo].name).length > 0, "User does not exist!");

        delete users[_rollNo];

        // Remove roll number from allRollNumbers list
        for (uint256 i = 0; i < allRollNumbers.length; i++) {
            if (keccak256(abi.encodePacked(allRollNumbers[i])) == keccak256(abi.encodePacked(_rollNo))) {
                allRollNumbers[i] = allRollNumbers[allRollNumbers.length - 1];
                allRollNumbers.pop();
                break;
            }
        }

        emit UserRemoved(_rollNo);
    }

    function getAllUsersWithStatus() external view returns (string[] memory rollNumbers, bool[] memory statuses) {
        uint256 totalUsers = allRollNumbers.length;
        bool[] memory tempStatuses = new bool[](totalUsers);

        for (uint256 i = 0; i < totalUsers; i++) {
            tempStatuses[i] = users[allRollNumbers[i]].approved;
        }

        return (allRollNumbers, tempStatuses);
    }
}
