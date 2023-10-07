const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

exports.signup= (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password,12)
    .then(hashPwd=>{
        const user = new User({
            email:email,
            name:name,
            password:hashPwd
        });
        return user.save();
    })
    .then(result=>{
        res.status(200).json({message:'User saved successfully.!',userId:result.id});
    })
    
    .catch(err=>{
        if(!err?.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.login = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let loggedIn;
    User.findOne({where:{email:email}})
    
    .then(user=>{
        if(!user){
            const error = new Error('User with this email not found.!');
            error.statusCode = 401;
            throw error;
        }
        loggedIn=user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual =>{
        if(!isEqual){
            const error = new Error('Password doen\'t match.');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email:loggedIn.email,
            userId:loggedIn.id.toString()
        },"supersupersecretsecret",{expiresIn:'1h'});

        res.status(200).json({token:token,userId:loggedIn.id});
        
    })
    
    .catch(err=>{
        if(!err?.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}