const BulletinText = require('../models/BulletinText')

async function createBulletin(req, res) {
    try{
        const bulletinHeader = req.body.bulletinHeader
        const bulletinText = req.body.bulletinText

        const newBulletin = new BulletinText({
            bulletinHeader,
            bulletinText
        })

        const savedBulletin = await newBulletin.save()

        res.json({
            success : true,
            bulletin : savedBulletin
        })
    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}



async function editBulletin(req, res, next){
    try{
        const bulletinId = req.params.id
        const editedBulletin = req.body
        const updatedBulletin = await BulletinText.findByIdAndUpdate(bulletinId, editedBulletin)

        res.json({
            success : true,
            updatedBulletin : updatedBulletin
        })
    }
    catch (e){
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

async function allBulletins(req, res){
    try{
        const bulletins = await BulletinText.find({})

        res.json({
            success : true,
            bulletins : bulletins
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
    createBulletin,
    editBulletin, 
    allBulletins
}