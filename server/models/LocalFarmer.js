const mongoose = require('mongoose')

const localFarmerSchema = new mongoose.Schema({
    name : String,
    description : String,
    websiteURL : String,
    phoneNumber : String
})

const LocalFarmer = mongoose.model('localFarmers', localFarmerSchema)
module.exports = LocalFarmer