const express = require('express');
const authController = require('../controllers/authcontroller'); // Pastikan ini sesuai dengan nama file
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
