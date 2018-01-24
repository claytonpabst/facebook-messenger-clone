var app = require('./index.js');

module.exports = {

  getCurrentConversation: function (req, res) {
    // console.log("getting current conversation");
    const db = req.app.get('db');

    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }

    // conversation id is users id first, then a colon, then correspondent's id
    let conversationid = req.session.user.id + ':' + req.body.id

    db.getCurrentConversation([conversationid])
      .then(response => {
        // console.log(response);
        return res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
  },

  getNewCorrespondent: function (req, res) {
    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }
    
    // console.log("getting most recent correspondent");
    const db = req.app.get('db');

    db.getUserInfo([req.body.id])
      .then(response => {
        // console.log(response[0]);
        return res.status(200).send(response[0]);
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
  },

  getConversationThreads: function(req, res){

    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }

    const db = req.app.get('db');

    db.getConversationThreads([req.session.user.id])
      .then(response => {
        return res.status(200).send(response)
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
  },

  addNewMessage: function(req, res){

    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }
    // console.log('session', req.session.user, 'body', req.body);
    
    const db = req.app.get('db');
    let conversationiduser = req.session.user.id + ':' + req.body.correspondentid;
    let userName = req.session.user.firstname + ' ' + req.session.user.lastname;
    let conversationidcorrespondent = req.body.correspondentid + ':' + req.session.user.id;
    let correspondentname = req.body.correspondentfirstname + ' ' + req.body.correspondentlastname;
    db.addNewMessage([conversationiduser,
                      correspondentname,
                      false,
                      req.body.message])
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
    db.addNewMessage([conversationidcorrespondent,
                      userName,
                      true,
                      req.body.message])
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
    db.updateMostRecentCorrespondent([req.session.user.id,
                                      req.body.correspondentid])
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
    db.updateMostRecentCorrespondent([req.body.correspondentid,
                                      req.session.user.id])
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
    db.updateOpenThreads([req.session.user.id,
                          req.body.correspondentid,
                          req.body.message])
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
    db.updateOpenThreads([req.body.correspondentid,
                          req.session.user.id,
                          req.body.message])
      .then(response => {
        return res.status(200).send(response)
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });


  },

  getSearchResults: function(req, res){
    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }
    
    const db = req.app.get('db');
    let searchInput = req.body.searchInput + '%';

    db.searchUsers([searchInput])
    .then( response => {
      console.log(response);
      return res.status(200).send(response);
    })
    .catch( err => {
      console.log(err);
      return res.status(200).send(err);
    })
  }

};
