const mongoose = require('mongoose')

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        username: String,
        content: String,
    })
)

module.exports = Comment