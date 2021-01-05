const mongoose = require('mongoose')

const Milestone = mongoose.model(
    "Milestone",
    new mongoose.Schema({
        event: String,
        description: String,
        date: Date
    },
    {timestamps: true})
)

module.exports = Milestone