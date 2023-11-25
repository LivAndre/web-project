const express = require('express')
const prodController = require('../controllers/product_controller')
const prodRouter = express.Router()


prodRouter.get('/view/all', prodController.viewAllProducts)



module.exports = prodRouter
