var app = require('./index.js');

mainController = {
    login: function(req, res){
        console.log('hit')
        const db = req.app.get('db');
        db.login([req.body.email, req.body.password])
        .then( response => {
            if(response.length){
                req.session.isLoggedIn = true;
                response[0].isLoggedIn=true;
                req.session.user = response[0];
            } else {
              req.session.isLoggedIn = false
              return res.status(200).send({
                  isLoggedIn: false, 
                  message: 'Invalid email or password.'
                })
            }
            console.log(response)
            console.log(req.session)
            return res.status(200).json( response[0] )
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })        
    },
    isLoggedIn: function(req, res){
        if (req.session.isLoggedIn){
            return res.status(200).send(req.session.user);
        }else{
            return res.status(200).send({isLoggedIn: false})
        }
    }
}

module.exports = mainController