const { ethers } = require("ethers");
const fs = require("fs");
const { abi } = require("../smartcontract/builds/compiledContract.json")
const config = require("../../config");

const contractAddress = config.contractAddress;
const privateKey = config.privateKey; 
const infuraProjectId = config.infuraProjectId; 
const infuraAPISecret = config.infuraAPISecret;

const provider = new ethers.InfuraProvider("goerli", infuraProjectId, infuraAPISecret);
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, signer);

module.exports = contract;