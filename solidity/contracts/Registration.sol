pragma solidity ^0.4.4;

contract Registration{
    
    struct dataUser{
        bytes32 userEmail;
        bytes32 userPassword;
        address userEthAddr;
        uint userRole;
    } 
    
    mapping (bytes32 => dataUser) public userData;
    
    function addUserData(bytes32 hash_email, bytes32 hash_pass, address hash_ethAddr, uint role) public {
        dataUser memory data_user = dataUser(hash_email, hash_pass, hash_ethAddr, role);
        userData[hash_email] = data_user;
    }
    
    function getData (bytes32 email) public view returns(bytes32, bytes32, address, uint) {
	    return (userData[email].userEmail, userData[email].userPassword, userData[email].userEthAddr, userData[email].userRole);
	}
    
    
}