const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    // let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1];
    // }
    // if (!token) {
    //     return next(new ErrorResponse('Not authorized to access this route', 401));
    // }
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = await User.findById(decoded.id);
    //     next();
    // } catch (error) {
    //     return next(new ErrorResponse('Not authorized to access this route', 401));
    // }
}

// Check if user is admin (middleware for admin)
exports.isAdmin = async (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse('Access denied! You must be an administrator to access this route.', 401));
    }
    next();
}