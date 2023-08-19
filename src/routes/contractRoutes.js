const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

// Routes for user data
router.post('/set-user', contractController.setUser);
router.get('/get-user/:rollNo', contractController.getUserByRollNo);
router.get('/all-users-status', contractController.getAllUsersWithStatus);
router.get('/is-approved/:rollNo', contractController.isUserApproved);
router.delete('/delete-user/:rollNo', contractController.deleteUser);

// Admin related routes
router.put('/add-admin', contractController.addAdmin);
router.put('/remove-admin', contractController.removeAdmin);
router.put('/set-approval', contractController.setApprovalStatus);

module.exports = router;
