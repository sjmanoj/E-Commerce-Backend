const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const validateToken = (req,res,next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_KEY, (err, decoded)=>{
        if (err){
            res.status(401).json('Token is not Valid')
        }
        if (!err){
            req.user = decoded
            //console.log(req.user);
            //console.log(req.user);
            //console.log(req.user.isAdmin);
            next()
        }
        
    })
    }
    else{
        return res.status(401).json('You are not authenticated')
    }
    
}

const validateTokenAndAuth = (req,res,next)=>{
    validateToken(req,res,()=>{
        if (req.user._id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(400).json('You do not have the permission')
        }
    })
}

const AdminAuth = (req,res,next)=>{
    validateToken(req,res,()=>{
        if (req.user.isAdmin){
            next()
        }else{
            res.status(400).json('Only Admin has Access')
        }
    })
}

module.exports = { validateToken, validateTokenAndAuth, AdminAuth }