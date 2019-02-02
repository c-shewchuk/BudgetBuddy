const mysql = require('mysql');
const express = require('express');


const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
});

db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('MySql Connected..');
});

const app = express();

app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.listen('3306', () =>{
    console.log('Server started on port 3306');
});