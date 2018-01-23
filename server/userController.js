var app = require('./index.js');

module.exports = {

  getMessagesForCorrespondent: function (req, res) {
    console.log("getting message history for correspondent");
    const db = req.app.get('db');

    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }

    // conversation id is users id first, then a colon, then correspondent's id
    let conversationid = req.session.id + ':' + req.body.id

    db.getMessagesForCorrespondent([conversationid])
      .then(response => {
        console.log(response);
        return res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
  },

  getMostRecentCorrespondent: function (req, res) {
    console.log("getting most recent correspondent");
    const db = req.app.get('db');

    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }

    db.getUserInfo([req.body.id])
      .then(response => {
        console.log(response[0]);
        return res.status(200).send(response[0]);
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });
  },

};
