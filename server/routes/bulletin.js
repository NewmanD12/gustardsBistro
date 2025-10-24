const express = require('express')
const router = express.Router()

const bulletinController = require('../controllers/bulletinController')

router.put('/edit-bulletin/:id', 
    bulletinController.editBulletin
)
router.post('/create-bulletin',
    bulletinController.createBulletin)
router.get('/all-bulletins', bulletinController.allBulletins)

module.exports = router