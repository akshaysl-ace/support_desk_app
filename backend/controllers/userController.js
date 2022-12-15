const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

// desc - Route to resgitser a user
// route - /api/users
// access - public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validation of params
    if (!name || !email || !password) {
        console.log("no valid data");
        res.status(400);
        throw new Error("Please provide all values !");
    }

    // if user already exists
    const isUserPresentInDb = await User.findOne({ email });
    if (isUserPresentInDb) {
        res.status(400);
        throw new Error("User already exists");
    }

    // hash password
    let hash;
    try {
        const salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Something went wrong !");
    }

    // creata new User
    const newUser = await User.create({ name: name, email: email, password: hash });
    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: getJwt(newUser._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid information !");
    }

});

// desc - Route to login a user
// route - /api/users/login
// access - public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check in db for existing user and pass
    const existingUser = await User.findOne({ email });
    if (existingUser && await (bcrypt.compare(password, existingUser.password))) {
        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token: getJwt(existingUser._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid credentials !");
    }
});

// desc - Route to get the logged in user's data
// route - /api/users/me
// access - private

const getMe = asyncHandler(async (req, res) => {
    if (req.user) {
        const user = {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name
        }
        res.status(200).json(user);
    }
    else {
        throw new Error("Access Denied !");
    }
});



// Generate token

const getJwt = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10h"
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}