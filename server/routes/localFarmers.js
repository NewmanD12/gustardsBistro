const express = require('express')
const router = express.Router()

const localFarmersController = require('../controllers/localFarmersController')

router.post('/create-local-farmer', localFarmersController.createLocalFarmer)
router.get('/all-local-farmers', localFarmersController.allLocalfarmers)
router.put('/edit-local-farmer/:farmerID', localFarmersController.editFarmer)
router.delete('/delete-local-farmer/:farmerID', localFarmersController.deleteLocalFarmer)
module.exports = router