const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.getALLUser = async(req,res) =>{
    try{
        const user = await User.find()
        res.status(200).json(user)

    } catch(error){
        res.status(400).json({message:error})
    }
}


exports.register = async(req,res) =>{
    const {username,email,password,role} = req.body

    try{
        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({username,email,password:hashPassword,role})
        res.status(201).json({message:"Successfully registered",success:true})

    } catch(error){
        res.status(400).json({message:error,success:false})
    }
}




exports.login = async(req,res) =>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message:"User not found"})

        const compare = await bcrypt.compare(password, user.password)

        if(!compare) return res.status(400).json({message:"Invalid password"})

        const options = {
            id: user._id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(options,process.env.secret_key)

        res.cookie('token',token, {
            expires: new Date(Date.now() + 120000),
            httpOnly:true

        })

        res.status(200).json({message:"Login  Successful",token,role:user.role,name:user.username})

    } catch(error){
        res.status(400).json({message:error})
    }
}