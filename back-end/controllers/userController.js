
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
//@desc RegisterUser
//@route POST: api/users 
const registerUser = asyncHandler(async (req,res) => {
    
    res.status(200).json({message:'Register Success'})
})

//@desc PloginUser
//@route POST: api/users/login
const loginUser = asyncHandler(async (req,res) => {

    res.status(200).json({message:'Login Success'})
})

//@desc Getme
//@route GET: api/users/me

const getMe = asyncHandler(async (req,res) => {
    res.status(200).json({message:'Get me Success'})
})

module.exports = {
    registerUser,loginUser,getMe
}