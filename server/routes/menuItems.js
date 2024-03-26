const express = require('express')
const router = express.Router()

const menuItemsController = require('../controllers/menuItemsController')

router.post('/create-menu-item', menuItemsController.createMenuItem)
router.get('/all-menu-items', menuItemsController.allMenuItems)
router.delete('/delete-menu-item/:id', menuItemsController.deleteMenuItem)
router.put('/edit-item/:menuItemId', menuItemsController.editMenuItem)
router.put('/edit-side-item/:sideItemId', menuItemsController.editSideItem)

module.exports = router