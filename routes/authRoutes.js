const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// Auth routes
// /api/signup
router.post('/signup', signup);

// /api/signin
router.post('/signin', signin);

// /api/logout
router.get('/logout', logout);

// /api/me
router.get('/me', isAuthenticated, userProfile);


// const authController = require('../controllers/authController');


// Register route
// router.post('/register', authController.register);

// // Login route
// router.post('/login', authController.login);

// // Logout route
// router.post('/logout', authController.logout);

module.exports = router;