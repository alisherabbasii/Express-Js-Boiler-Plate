const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const feedModel = sequelize.define('Post',{
    title:{
        type:Sequelize.STRING,
        required:true
    },
    content:{type:Sequelize.STRING,required:true},
    imageUrl:{type:Sequelize.STRING,required:true},
    creator:{type:Sequelize.STRING}

});

module.exports = feedModel;