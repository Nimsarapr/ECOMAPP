const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// ලියාපදිංචි වීමට
router.post('/register', registerUser);

// ලොග් වීමට
router.post('/login', loginUser);

module.exports = router;