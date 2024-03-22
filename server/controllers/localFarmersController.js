const LocalFarmer = require('../models/LocalFarmer')

async function createLocalFarmer(req, res) {
    try {
        const name = req.body.name
        const description = req.body.description
        const phoneNumber = req.body.phoneNumber
        const websiteURL = req.body.websiteURL

        const newLocalFarmer = new LocalFarmer({
            name, 
            description,
            phoneNumber,
            websiteURL
        })

        const savedLocalFarmer = await newLocalFarmer.save()

        res.json({
            success : true,
            localFarmer : savedLocalFarmer
        })
    }
    catch(e) {
        res.json({
            success : false, 
            error : e.toString()
        })
    }
}

async function allLocalfarmers(req, res){
    try {
        const localFarmers = await LocalFarmer.find({})

        res.json({
            success : true,
            localFarmers : localFarmers
        })
    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

module.exports = {
    createLocalFarmer,
    allLocalfarmers
}