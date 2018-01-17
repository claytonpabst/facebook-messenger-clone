const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();
var server = require('http').createServer(app);
const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        client.emit('timer', new Date());
      }, interval);
  });
});

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false,
  cookie:{
    maxAge: (1000*60*60*24*14) //this is 14 days
  }
}))

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

//////////Endpoints for the front end



io.listen(config.port);
console.log("listening on port:" + config.port);
// server.listen(config.port, console.log("you are now connected on " + config.port));
