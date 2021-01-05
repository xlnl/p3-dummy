const config = require('../config/auth.config')
const db = require('../models/index')
//Access to our db through user and role variable
const User = db.user
const Role = db.role

//This will give us access to encode and decode the jwt itself (allows us to workwith jwt)
const jwt = require('jsonwebtoken')
//For hashing / encrypting out passwords
const bcrypt = require('bcryptjs')

//This will handle stand up
exports.signup = async (req, res) => {
    
    //We are going to make out user object using the params returned from req
    const password = await req.body.password

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        city: req.body.city,
        profilePic: req.body.profilePic,
        password: bcrypt.hashSync(password, 8),
    })
    // We save that user, and if there is an error, we throw that error
    await user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err})
            return
        }
        //If no error, we check if roles was passed on req.params
        if(req.body.roles) {
            await Role.find({
                name: {$in: req.body.roles}
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({message: err})
                    return
                }
                //If no error, pass roles id from query above to user.roles
                user.roles = roles.map(role => role._id)
                //Save our updated users
                user.save(err => {
                    if(err) {
                        res.status(500).send({message: err})
                        return
                    }

                    res.send({message: 'User created successfully'})

                })

            })

        } else {
            await Role.findOne({name: 'user'}, (err, role) => {
                if(err) {
                    res.status(500).send({message: err})
                    return
                }
                console.log(role)
                // Assigns user roles id to document
                user.roles = [role._id]

                user.save(err => {
                    if(err) {
                        res.status(500).send({message: err})
                        return
                    }
                    res.send({message: 'User was registered successfully'})    
                })
            })
        }

    }).catch(err => {
        console.log(err)
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    //Populates values from the roles id we stored in the document
    .populate('roles', '-__v')
    //Exec returning our user to user
    .exec((err, user) => {
        if(err) {
            res.status(500).send({message: err})
            return
        }
        //If user did not exist
        if(!user) {
            res.status(404).send({message: "User not found"})
        }
        //Validate the password by passing req.body password and the password returned from db
        //over to bcrypt to unhash and compare
        const passwordIsValid = bcrypt.compareSync(
            req.body.password, //Unencrypted password from req.body
            user.password //Encrypted password saved in database
        )
        //If password is valid, we generate a new token
        if(!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 //Expires token in 24 hours
        })
        //Setting roles to pass back in our response
        let authorities = []

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
        }
        //Sending that response back
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            city: user.city,
            profilePic: user.profilePic,
            roles: authorities,
            accessToken: token
        })
    })
}