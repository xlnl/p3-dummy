const mongoose = require('mongoose')

const JournalEntry = mongoose.model(
    "JournalEntry",
    new mongoose.Schema({
        heading: String,
        content: String,
    },
    {timestamps: true})
)

module.exports = JournalEntry