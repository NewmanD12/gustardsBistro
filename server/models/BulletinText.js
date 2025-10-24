const mongoose = require('mongoose')

const bulletinSchema = new mongoose.Schema({
    bulletinHeader : String, 
    bulletinText : String,
})

const BulletinText = mongoose.model('bulletinText', bulletinSchema)
module.exports = BulletinText