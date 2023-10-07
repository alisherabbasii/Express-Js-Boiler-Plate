const express = require('express');
const {body} = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup',[
    body('email').isEmail().withMessage("Please enter a valid email.").custom((value,{req})=>{
        return User.findOne({where:{email:value}}).then(userObj=>{
            if(userObj){
                return Promise.reject("E-mail already exist.!");
            }
        })
    }).normalizeEmail(),
    // email validation ends here
    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
],authController.signup);


router.post('/login',authController.login)
module.exports = router;
