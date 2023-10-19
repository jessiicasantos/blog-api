const express = require('express')
const mysql = require('mysql')
var cors = require('cors')
// import express from 'express'
// import mysql from 'mysql'

const app = express()
const port = 5000
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'myapp'
})

app.use(express.json())
app.use(cors())

app.get('/posts', (req, res) => {
    connection.connect(function(err) {
        if (err) throw err;
        
        console.log("Connected!");
        
        const command = `SELECT * FROM posts ORDER BY Id DESC LIMIT 12;`;

        connection.query(command, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log('Result Param: ', result);
            res.status(200).json( result );
        });
    });
})

app.get(`/posts/:postId`, (req, res) => {
    console.log('REQ PARAMS: ', req.params);

    connection.connect(function(err) {
        if (err) throw err;
        
        console.log("Connected!");
        
        const command = `SELECT * FROM posts WHERE Id = ${req.params.postId};`;

        connection.query(command, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            // console.log('Command Param: ', command, ' Result Param:', result);
            console.log('Result Param:', result);
            res.status(200).json( result.shift() );
        });
    });
})

app.post('/posts/:postId', (req, res) => {
    console.log(req.body);

    connection.connect(function(err) {
        if (err) throw err;
        
        console.log("Connected!");
        
        const command = `INSERT INTO posts(Title, Author, ImageUrl, Content) VALUES('${req.body.title}', '${req.body.author}', '${req.body.img}', '${req.body.content}')`;

        connection.query(command, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.status(201).send( result );
        });
    });
})

app.post('/posts', (req, res) => {
    console.log(req.body);

    connection.connect(function(err) {
        if (err) throw err;
        
        console.log("Connected!");
        
        const command = `INSERT INTO posts(Title, Author, ImageUrl, Content) VALUES('${req.body.title}', '${req.body.author}', '${req.body.img}', '${req.body.content}')`;

        connection.query(command, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            res.status(201).send( result );
        });
    });
})

app.patch(`/posts/:postId`, (req, res) => {
    console.log('REQ BODY: ', req.body);
    console.log('REQ PARAMS: ', req.params);

    connection.connect(function(err) {
        if (err) throw err;
        
        console.log("Connected!");
        
        const command = `UPDATE posts SET Title = '${req.body.title}', Author = '${req.body.author}', ImageUrl = '${req.body.img}', Content = '${req.body.content}' WHERE Id = ${req.params.postId};`;

        connection.query(command, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            // console.log('Command Param: ', command, ' Result Param:', result);
            console.log('Result Param:', result);
            res.status(200).json( result );
        });
    });
})

app.delete(`/posts/:userId`, (req, res) => {
    console.log('REQ PARAMS: ', req.params);

    connection.connect(function(err) {
        if (err) throw err;
        
        console.log("Connected!");
        
        const command = `DELETE FROM posts WHERE Id = ${req.params.userId};`;

        connection.query(command, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            // console.log('Command Param: ', command, ' Result Param:', result);
            console.log('Result Param:', result);
            res.status(200).json( result );
        });
    });
})

app.listen(port, () => {
    console.log(`Blog API Listening on port ${port}`);
})