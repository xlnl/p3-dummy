const db = require("../models")

const User = db.user

exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to Petflix!")
}

// displays user profile
exports.userBoard = async (req, res) => {
    // Find all the post in the database
    const id = req.userId
    await User.findById(
        { _id: id })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user info."
            })
        })
}

// is this necessary or will the function userBoard do the trick?
// displays pet components (find all user's pets)
exports.findUserPets = async (req, res) => {
    // Find all the post in the database
    const id = req.userId
    await Pet.find(
        { _id: id })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all the user's pets."
            })
        })
}


exports.adminBoard = (req, res) => {
    res.status(200).send('Admin content')
} 

exports.About = (req, res) => {
    res.status(200).send("About the app & developers!")
}
