const express = require('express')
const { getALLUser, register, login } = require('../controllers/user')
const { auth, isStudent, isAdmin } = require('../middleware/auth')
const { registerValidation, loginValidation } = require('../middleware/authValidation')

const router = express.Router()



router.get('/',auth, getALLUser)

router.post('/register',registerValidation, register)

router.post('/login',loginValidation, login)

router.get('/student',auth,isStudent,(req,res)=>{
    res.status(200).json({message:"This is student protected route"})
})

router.get('/admin',auth,isAdmin,(req,res)=>{ 

    res.status(200).json({message:"This is Admin protected route"})
})








module.exports = router