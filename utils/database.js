const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete','root','alisher.1',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;