const express = require('express')
const router = express.Router()

const localFarmersController = require('../controllers/localFarmersController')

router.post('/create-local-farmer', localFarmersController.createLocalFarmer)

module.exports = router