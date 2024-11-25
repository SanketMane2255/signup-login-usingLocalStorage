const jwt = require('jsonwebtoken')


exports.auth = (req,res,next) => {
    try{
        const token =  req.body.token || req.cookies.token || req.headers.authorization.split(" ")[1] 

        if(!token) return res.json({message:"token is missing"})

        const decode = jwt.verify(token, process.env.secret_key)

        if(!decode) return res.json({message:"token is invalid"})

        //res.json(decode)

        req.user = decode

        next()

    } catch(error){
        res.status(400).json({message:error}) 
    }
}

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student")
            return res.status(400).json({message:"You are unauthorised person"})
        next()

    } catch(error) {
        res.status(400).json({message:error})
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin")
            return res.status(400).json({message:"You are unauthorised person"})
        next()

    } catch(error){
        res.status(400).json({message:error})
    }
}