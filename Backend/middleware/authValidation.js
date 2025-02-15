const joi = require('joi')

const registerValidation = async(req,res,next) => {
    const schema = joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
        role: joi.string().required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0],
        })
    }
    next()
}

const loginValidation = async(req,res,next) => {
    const schema = joi.object({
       
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
       
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({success: false,
            message: 'Validation error',
            error: error.details[0],})
    }
    next()
}

module.exports = {registerValidation,loginValidation}