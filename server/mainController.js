var app = require('./index.js');

mainController = {
    login: function(req, res){
        console.log('hit')
        const db = req.app.get('db');
        db.login([req.body.email, req.body.password])
        .then( response => {
            if(response.length){
                req.session.isLoggedIn = true;
                req.session.user = response[0].id;
                response[0].isLoggedIn=true;
            } else {
              req.session.isLoggedIn = false
              return res.status(200).send('Invalid username or password.')
            }
            console.log(response)
            console.log(req.session)
            return res.status(200).json( response )
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })        
    },
}

module.exports = mainController