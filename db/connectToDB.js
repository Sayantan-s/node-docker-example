const { Sequelize } = require("sequelize");

module.exports = new Sequelize('mysql-crud','root','',{
    dialect : 'mysql',
    host: 'localhost'
})