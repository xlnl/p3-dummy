const mongoose = require('mongoose')

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        city: String,
        password: String,
        profilePic: String,
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        journalEntries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JournalEntry"
            }
        ],
        pets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pet"
            }
        ],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
)

module.exports = User