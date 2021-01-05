const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose

db.user = require('./user.model')
db.role = require('./role.model')
db.comment = require('./comment.model')
db.post = require('./post.model')
db.pet = require('./pet.model')
db.journalEntry = require('./journalEntry.model')
db.milestone = require('./milestone.model')

db.Roles = ['users', 'admin']

module.exports = db