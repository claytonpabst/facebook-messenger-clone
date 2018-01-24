var app = require('./index.js');

mainController = {
    login: function(req, res){
        // console.log('hit')
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
            // console.log(response)
            // console.log(req.session)
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
    },
    createNewUser: function(req, res){
        const db = req.app.get('db');
        db.checkDuplicateUser([req.body.email])
        .then( existingUser => {
            if (existingUser[0]){
                return res.status(200).send({success: false, message: 'The email is already in use'});
            }
            db.createNewUser([req.body.firstName, req.body.lastName, req.body.email, req.body.password])
            .then( response => {
                console.log(response);
                req.session.isLoggedIn = true;
                response[0].isLoggedIn=true;
                req.session.user = response[0];
                return res.status(200).send({success: true, message: 'Account created successfully'});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
    }
}

module.exports = mainController;