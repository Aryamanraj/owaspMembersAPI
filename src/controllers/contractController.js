const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToIPFS } = require("../utils/ipfsUpload.js");
const { saveBufferToFile } = require("../utils/fileUtils.js");
const { storeAndUpdateIPNS } = require("../utils/saveDataWithIpns");
const fs = require("fs");
const contract = require("../utils/contract");

exports.setUser = [
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { name, email, phone, branch, rollNo } = req.body;
      const fileBuffer = req.file.buffer;

      const tempFilePath = await saveBufferToFile(fileBuffer);
      const fileCID = await uploadToIPFS(tempFilePath);

      await fs.promises.unlink(tempFilePath);

      const txHash = await contract.setUser(rollNo, name, email, phone, branch, fileCID);
      
      // Backup the user set data
      const backupStringForSetUser = `
        User Set:
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Branch: ${branch}
          Roll No: ${rollNo}
          File CID: ${fileCID}
      `;
      await storeAndUpdateIPNS(backupStringForSetUser);

      res.status(200).json({ success: true, txHash });
    } catch (error) {
      next(error);
    }
  },
];

exports.setApprovalStatus = async (req, res, next) => {
    try {
      const { rollNo, status } = req.body;

      const txHash = await contract.setApprovalStatus(rollNo, status);

      // Backup approval data
      const backupStringForApproval = `
        Approval Status Set:
          Roll No: ${rollNo}
          Status: ${status}
      `;
      await storeAndUpdateIPNS(backupStringForApproval);

      res.status(200).send({ message: "Approval status updated", txHash });
    } catch (error) {
      next(error);
    }
};

exports.addAdmin = async (req, res, next) => {
  try {
    const { adminAddress } = req.body;
    const txHash = await contract.addAdmin(adminAddress);

    // Backup admin addition data
    const backupStringForAddAdmin = `
      Admin Added:
        Admin Address: ${adminAddress}
    `;
    await storeAndUpdateIPNS(backupStringForAddAdmin);

    res.status(200).send({ message: "Admin added", txHash });
  } catch (error) {
    next(error);
  }
};

exports.removeAdmin = async (req, res, next) => {
  try {
    const { adminAddress } = req.body;
    const txHash = await contract.removeAdmin(adminAddress);

    // Backup admin removal data
    const backupStringForRemoveAdmin = `
      Admin Removed:
        Admin Address: ${adminAddress}
    `;
    await storeAndUpdateIPNS(backupStringForRemoveAdmin);

    res.status(200).send({ message: "Admin removed", txHash });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const rollNo = req.params.rollNo;
    const txHash = await contract.deleteUser(rollNo);

    // Backup user deletion data
    const backupStringForDeleteUser = `
      User Deleted:
        Roll No: ${rollNo}
    `;
    await storeAndUpdateIPNS(backupStringForDeleteUser);

    res.status(200).send({ message: "User deleted", txHash });
  } catch (error) {
    next(error);
  }
};

exports.getUserByRollNo = async (req, res, next) => {
  try {
    const rollNo = req.params.rollNo;
    const user = await contract.getUserByRollNo(rollNo);
    const { name, email, phone, branch, fileCID, approved } = user;

    const sanitizedUser = {
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
      branch: branch.toString(),
      fileCID: fileCID.toString(),
      approved: approved.toString(),
      imageUrl: `https://gateway.lighthouse.storage/ipfs/${fileCID}`
    };

    res.status(200).send(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsersWithStatus = async (req, res, next) => {
  try {
    const usersWithStatus = await contract.getAllUsersWithStatus();
    const rollNumbers = usersWithStatus[0];
    const statuses = usersWithStatus[1];

    const users = rollNumbers.map((roll, index) => ({
      rollNo: roll,
      approved: statuses[index],
    }));

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

exports.isUserApproved = async (req, res, next) => {
  try {
    const rollNo = req.params.rollNo;
    const approved = await contract.isUserApproved(rollNo);
    res.status(200).send({ approved });
  } catch (error) {
    next(error);
  }
};
