const express = require('express')
const prodstockController = require('../controllers/productstock_controller')
const prodstockRouter = express.Router()


prodstockRouter.get('/view/all', prodstockController.viewAllProductStocks)
prodstockRouter.get('/view/:id', prodstockController.viewByProductstockId)
prodstockRouter.get('/view/sizes/:id', prodstockController.viewSizesByProductId)





module.exports = prodstockRouter
