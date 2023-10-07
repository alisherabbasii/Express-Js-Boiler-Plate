const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Post = require('./Post');

const User = sequelize.define('User',{
    email:{
        type:Sequelize.STRING,
        required:true
    },
    password:{
        type:Sequelize.STRING,
        required:true
    },
    name:{
        type:Sequelize.STRING,
        required:true
    },
    status:{
        type:Sequelize.STRING,
        default:'i am new !'
    }
});

User.hasMany(Post,{foreignKey:'creator'});

module.exports = User;