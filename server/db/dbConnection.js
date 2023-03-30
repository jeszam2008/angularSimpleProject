require('dotenv').config();

var mysql = require('mysql');

const poolConnections = {
    db_w3school: mysql.createPool({ 
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'w3school'
    }) 
};

module.exports = poolConnections;