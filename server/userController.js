var app = require('./index.js');

module.exports = {
  getMessagesForCorrespondent: function (req, res) {
    console.log("getting message history for correspondent");
    const db = req.app.get('db');

    if (!req.session.user){
      return res.status(200).send({message: 'Must be logged in to use this page'});
    }

    console.log(req.session.user.id);
    let tableName = req.session.user.id + '-' + req.body.id;
    // db.getMessagesForCorrespondent([tableName])
    //   .then(response => {
    //     console.log(response);
    //     return res.status(200).send(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     return res.status(200).send(err);
    //   });
  },


};
