const lighthouse = require("@lighthouse-web3/sdk");
const config = require("../../config");
const axios = require('axios');

const apiKey = config.lighthouseApiKey;
const ipnsKey = config.ipnsKey;
const ipnsName = config.ipnsName;

const uploadText = async (updatedHistory) => {
  const response = await lighthouse.uploadText(updatedHistory, apiKey);
  console.log(response.data.Hash);
  return response.data.Hash;
};

const getLatestCID = async () => {
  const allKeys = await lighthouse.getAllKeys(apiKey);
  const keyData = allKeys.data.find(entry => entry.ipnsName === ipnsName);
  
  if(!keyData) {
    throw new Error(`Unable to find IPNS Name: ${ipnsName}`);
  }

  return keyData.cid;
};

const getCurrentHistory = async () => {
  const baseUrl = 'https://gateway.lighthouse.storage/ipfs';
  const latestCID = await getLatestCID();
  const response = await axios.get(`${baseUrl}/${latestCID}`);
  return response.data;
};

exports.storeAndUpdateIPNS = async (updateString) => {
  // Get current history from IPFS
  const currentHistory = await getCurrentHistory();

  // Append new update to the history
  const updatedHistory = `${currentHistory}\n${updateString}`;

  // Upload the updated history to IPFS
  const updatedHash = await uploadText(updatedHistory);

  // Update IPNS to point to the new IPFS CID (hash)
  const pubResponse = await lighthouse.publishRecord(updatedHash, ipnsName, apiKey);
  console.log(pubResponse.data);

  return pubResponse.data;
};

// You can test or use the functions accordingly:
// storeAndUpdateIPNS("Initialize");
// getCurrentHistory();
// uploadText("Initialize");
