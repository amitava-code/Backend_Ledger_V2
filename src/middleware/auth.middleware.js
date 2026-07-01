const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function authMiddleware(req, res, next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId)

        req.user = user

        return next()

    }catch(err){

        return res.status(401).json({
            message:"Unauthorized access, token is invaid"
        })

    }
}


async function systemUserAuthMiddleware(req, res, next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access, token is missing"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log("Decoded token userId:", decoded.userId)

        const user = await userModel.findById(decoded.userId).select("+systemUser")

        console.log("User found:", user)
        console.log("systemUser value:", user?.systemUser)
        console.log("systemUser type:", typeof user?.systemUser)

        if(!user.systemUser){
            return res.status(403).json({
                message:"Forbidden access, user is not a system user"
            })
        }

        req.user = user

        return next()

    }catch(err){

        return res.status(401).json({
            message:"Unauthorized access, token is invalid"
        })

    }
}

module.exports={
    authMiddleware,
    systemUserAuthMiddleware
}