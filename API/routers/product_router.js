const express = require('express')
const prodController = require('../controllers/product_controller')
const prodRouter = express.Router()


productRouter.get('/view/all', productController.viewAllProducts) 





module.exports = prodRouter