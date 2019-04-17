const mysql = require('mysql');

var connection =  mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'password',
    database:'budgetbuddy'
});

module.exports.connection = connection;