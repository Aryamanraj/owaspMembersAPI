const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const { verifyUserToken, verifyAdminToken } = require('../middlewares/verificationMiddleware');

// Routes for user data
router.post('/set-user', verifyStaticToken, contractController.setUser);
router.get('/get-user/:rollNo', contractController.getUserByRollNo);
router.get('/all-users-status', contractController.getAllUsersWithStatus);
router.get('/is-approved/:rollNo', contractController.isUserApproved);
router.delete('/delete-user/:rollNo', verifyStaticToken, contractController.deleteUser);

// Admin related routes
router.put('/add-admin', verifyAdminToken, contractController.addAdmin);
router.put('/remove-admin', verifyAdminToken, contractController.removeAdmin);
router.put('/set-approval', verifyStaticToken, contractController.setApprovalStatus);

module.exports = router;
