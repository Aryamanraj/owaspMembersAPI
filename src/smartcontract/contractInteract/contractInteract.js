const { ethers, InfuraProvider } = require('ethers');
const { abi } = require("../builds/compiledContract.json")
const config = require("../../../config");

const contractAddress = config.contractAddress; // Replace with the deployed contract address
const privateKey = config.privateKey; // Replace with the private key of your Ethereum wallet
const infuraProjectId = config.infuraProjectId; // Replace with your Infura project ID
const infuraAPISecret = config.infuraAPISecret;
const provider = new InfuraProvider("sepolia", infuraProjectId, infuraAPISecret);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);




// async function storeDataToContract(timestamp, ipfsCID) {
//   try {
//     const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
//     const signer = new ethers.Wallet(privateKey, provider);
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     const tx = await contract.storeData(timestamp, ipfsCID);
//     await tx.wait();
//     console.log('Data stored on the contract successfully!');
//   } catch (error) {
//     console.error('Error storing data on the contract:', error);
//   }
// }

// async function getDataByTimestampFromContract(timestamp) {
//   try {
//     const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
//     const signer = new ethers.Wallet(privateKey, provider);
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     const data = await contract.getDataByTimestamp(timestamp);
//     console.log('Data:', data);
//   } catch (error) {
//     console.error('Error getting data from the contract:', error);
//   }
// }

// async function getTimestampByCIDFromContract(ipfsCID) {
//   try {
//     const provider = new InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
//     const signer = new ethers.Wallet(privateKey, provider);
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     const timestamp = await contract.getTimestampByCID(ipfsCID);
//     console.log('Timestamp by CID:', timestamp);
//   } catch (error) {
//     console.error('Error getting timestamp by CID from the contract:', error);
//   }
// }

// storeDataToContract(Date.now(), "Qmf7CLcVRnyMPmSzKh7P2sPcinNYos61C93U3QrzVKDeDa")
// //getDataByTimestampFromContract(1690239813183) 


// Function to set user data
async function setUserData(name, email, phone, branch, fileCID, rollNo) {
    try {
        const tx = await contract.setUser(name, email, phone, branch, fileCID, rollNo);
        await tx.wait();
        console.log(`Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error setting user data:", error);
    }
}

// Function to set approval status of a user
async function setApprovalStatus(userAddress, status) {
    try {
        const tx = await contract.setApprovalStatus(userAddress, status);
        await tx.wait();
        console.log(`Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error setting approval status:", error);
    }
}

// Function to add an admin
async function addAdmin(adminAddress) {
    try {
        const tx = await contract.addAdmin(adminAddress);
        await tx.wait();
        console.log(`Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error adding admin:", error);
    }
}

// Function to remove an admin
async function removeAdmin(adminAddress) {
    try {
        const tx = await contract.removeAdmin(adminAddress);
        await tx.wait();
        console.log(`Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error removing admin:", error);
    }
}

// Function to delete a user
async function deleteUser(userAddress, rollNo) {
    try {
        const tx = await contract.deleteUser(userAddress, rollNo);
        await tx.wait();
        console.log(`Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// Function to get users by Roll no.
// Function to delete a user
async function getUserByRollNo(rollNo) {
    try {
        const tx = await contract.getUserByRollNo(rollNo);
        console.log(`Transaction hash: ${tx}`);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

//setUserData("John Doe", "john.doe@example.com", 1234567890, "Computer Science", "CID_HERE", "20cs3000");
getUserByRollNo("20cs3000")

// setApprovalStatus("20cs3001",true)