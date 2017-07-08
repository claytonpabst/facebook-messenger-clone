const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14) //this is 14 days
    }
}))

var conn = massive.connectSync({
  connectionString: config.connectionString
})


app.use(express.static(__dirname + './../build'))
app.set('db',conn);
var db = app.get('db');

var userController = require("./userController.js");

//////////Endpoints for the front end




app.listen(config.port, console.log("you are now connected on " + config.port));
