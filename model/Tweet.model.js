const Sequelize = require("sequelize");

const sqlize = require('../db/connectToDB')

const Tweet = sqlize.define('tweet',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,  
        primaryKey : true
    },
    img : {
        type : Sequelize.STRING,
        allowNull : false
    },
    verified : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    },
    name : {
        type : Sequelize.STRING,
        allowNull :false
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    statusText : {
        type : Sequelize.TEXT,
        allowNull : false
    }  
})

module.exports = Tweet