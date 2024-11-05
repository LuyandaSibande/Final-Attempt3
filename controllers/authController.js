
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if (userExist) {
        return next(new ErrorResponse('Email already registered', 400));
    }
    try {
        req.body.role = 0;
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    
    try {
        const {email, password} = req.body;
        // Validation
        if (!email) {
            return next(new ErrorResponse('Please provide an email', 403));
        }
        if (!password) {
            return next(new ErrorResponse('Please provide a password', 403));
        }
        // Check user email
        const user = await User.findOne({email});
        if (!user) {
            return next(new ErrorResponse('Credentials are invalid. Please provide correct credentials', 404));
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse('Credentials are invalid. Please provide correct credentials', 404));
        }

        sendTokenResponse(user, 200, res);
    
    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();

    res
        .status(codeStatus)
        .cookie('token', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        })
        .json({
            success: true,
            role: user.role
        })
}


// log out
exports.logout = async (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'User logged out'
    })
}

// user profile
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}