const MenuItem = require('../models/MenuItem')

async function createMenuItem(req, res) {
    try{
        const title = req.body.title
        const description = req.body.description
        const restaurant = req.body.restaurant
        const allergyWarnings = req.body.allergyWarnings
        const mealPeriodAndPrices = req.body.mealPeriodAndPrices
        const subsAndUpcharges = req.body.subsAndUpcharges

        const newMenuItem = new MenuItem({
            title, 
            description,
            restaurant,
            allergyWarnings,
            mealPeriodAndPrices,
            subsAndUpcharges
        })

        const savedMenuItem = await newMenuItem.save()
        res.json({
            success : true,
            menuItem : savedMenuItem
        })


    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

async function allMenuItems(req, res){
    try{
        const menuItems = await MenuItem.find({})

        res.json({
            success : true,
            menuItems : menuItems
        })
    }
    catch (e) {
        res.json({
            success : false, 
            error : e.toString()
        })
    }
}

async function deleteMenuItem(req, res, next){
    try {
        const id = req.params.id
        const deletedItem = await MenuItem.findByIdAndDelete(id)
        res.json({
            success : true,
            id : id,
            deletedItem : deletedItem
        })
    }
    catch (e) {
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

async function editMenuItem(req, res, next){
    try{
        const menuItemId = req.params.menuItemId
        const editedMenuItem = req.body
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(menuItemId, editedMenuItem)

        res.json({
            success : true,
            updatedMenuItem : updatedMenuItem
        })
    }
    catch (e){
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

async function editSideItem(req, res, next){
    try{
        const sideItemId = req.params.sideItemId
        const editedSideItem = req.body
        const updatedSideItem = await MenuItem.findByIdAndUpdate(sideItemId, editedSideItem)

        res.json({
            success : true,
            updatedSideItem : updatedSideItem
        })
    }
    catch (e){
        res.json({
            success : false,
            error : e.toString()
        })
    }
}

module.exports = {
    createMenuItem, 
    allMenuItems, 
    deleteMenuItem, 
    editMenuItem,
    editSideItem
}