const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Carts = require('../models/cartModel')
const Products = require('../models/productModel')
const CryptoJS = require('crypto-js')

//Get All Users - only by Admin
getUsers = asyncHandler(async(req,res)=>{
    const users = await Users.find()
    if (!users){
        res.status(400)
        throw new Error('No Users Found')
    }
    res.status(200).json(users)
})

//Get your own User
getUser = asyncHandler(async(req,res)=>{
    const user = await Users.findById(req.params.id)
    if (!user){
        res.status(400)
        throw new Error('No such user Found')
    }
    res.status(200).json({_id: user.id,
        username: user.username,
        email: user.email})
})

//Update your own User
updateUser = asyncHandler(async(req,res)=>{
    const userAvailable = await Users.findById(req.params.id)
    if (!userAvailable){
        res.status(400)
        throw new Error('No such user Found')
    }
    const { username, email, password } = req.body 
    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_KEY).toString()

    const userUpdated = await Users.findByIdAndUpdate(req.params.id, {
        username,
        email,
        password: hashedPassword
    }, 
    {new: true})
    res.status(200).json({_id: userUpdated.id,
        username: userUpdated.username,
        email: userUpdated.email})
})

//Delete your own User
deleteUser = asyncHandler(async(req,res)=>{
    const user = await Users.findById(req.params.id)
    if (!user){
        res.status(400)
        throw new Error('No User Available')
    }
    await Users.findByIdAndDelete(req.params.id)
    res.status(200).json({_id: user.id,
        username: user.username,
        email: user.email})
})

//Get User Wishlist
getWishlist = asyncHandler(async(req,res)=>{
    userId = req.user._id
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }
    const userWishlist = await Users.findById(userId).populate("wishlist").select('username wishlist')
    res.status(200).json(userWishlist)
})

//Save the Address of the User
saveUserAddress = asyncHandler(async(req,res)=>{
    userId = req.user._id
    if (!userId){
        res.status(400)
        throw new Error('No such user Found')
    }
    const { address } = req.body
    const userAddress = await Users.findByIdAndUpdate(userId, {address: address}, {new: true}).select('username address')
    res.json(userAddress)
})

module.exports = { getUsers, getUser, updateUser, deleteUser, getWishlist, saveUserAddress }