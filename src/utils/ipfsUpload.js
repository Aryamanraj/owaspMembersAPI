const lighthouse = require('@lighthouse-web3/sdk');
// import config from '../../config.js'
const config = require("../../config");

exports.uploadToIPFS = async (fileBuffer) => {
  const apiKey = config.lighthouseApiKey;
  const response = await lighthouse.upload(fileBuffer, apiKey);
  return response.data.Hash;  // Returns the CID
}
