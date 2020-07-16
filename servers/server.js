// const express = require('express');
// const app = express();
// // const cors = require('cors');
// const bodyParser = require('body-parser');
// const port =process.env.PORT || 3001;
// const route = require('./routes/index');

// // app.use(cors());

// app.use(bodyParser.json());
// app.use('/api', route); // app.use('/api', (req, res)=> res.json({username:'bryan'}));

// app.listen(port, ()=>{
//     console.log(`express is running on ${port}`);
// })



// serverjs

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// DEFINE MODEL
var Book = require('./models/book');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 3001;

// [CONFIGURE ROUTER]
// var router = 
require('./routes')(app, Book);

// [RUN SERVER]
// var server = 
app.listen(port, function(){
 console.log("Express server has started on port " + port)
});