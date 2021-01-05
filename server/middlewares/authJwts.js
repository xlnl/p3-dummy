const jwt = require('jsonwebtoken')
const config =  require('../config/auth.config')
const { user } = require('../models/index')
const db = require('../models/index')
const User = db.user
const Role = db.role

//This function will verify our web token
verifyWebToken = (req, res, next) => {
    //First we declare our token which is passed in our headers
    let token = req.headers['x-access-token']
    //If no token is given we respond with an error
    if(!token) {
        return res.status(403).send({message: 'No token provided'})
    }
    //We try to verify the token
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(403).send({message: 'Unauthorized'})
        }
        // Set user id to decoded id
        req.userId = decoded.id
        next()
    })
}


//Another functionto verify if admin or not

isAdmin = (req, res, next) => {
    //.exec returns the user we want to have access to (.then will not)
    User.find({_id: req.userId}).exec((err, user) => {
        //Throws an error because this user does not exist
        if(err) {
            return res.status(500).send({message: err})
        }
        // Find users role if the user exists
        Role.find({
            _id: {$in: user.roles}
        }, (err, roles) => {
            if(err) {
                return res.status(500).send({message: err})
            }

            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name ==='admin') {
                    next()
                    return
                }
            }
            // If no admin role, send status 403message
            res.status(403).send({message: 'Requires admin Role'})
        })
    })
}

//Add above into an object
const authJwt = {
    verifyWebToken,
    isAdmin
}

module.exports = authJwt