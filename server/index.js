const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server, { origins: '*:*'});


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
    maxAge: (1000*60*60*24*14) 
  }
}))

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

var mainController = require("./mainController.js");
var userController = require("./userController.js");

//////////Endpoints mainController
app.get('/api/isLoggedIn', mainController.isLoggedIn);
app.post('/api/login', mainController.login);
app.post('/api/createNewUser', mainController.createNewUser);

//endpoints for user
app.post('/api/getNewCorrespondent', userController.getNewCorrespondent);
app.post('/api/getCurrentConversation', userController.getCurrentConversation);
app.get('/api/getConversationThreads', userController.getConversationThreads);
app.post('/api/addNewMessage', userController.addNewMessage);
app.post('/api/getSearchResults', userController.getSearchResults);
app.post('/api/startNewConversation', userController.startNewConversation);




app.listen(config.port);
console.log("listening on port:" + config.port);
