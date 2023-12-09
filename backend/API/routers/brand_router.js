const express = require('express')
const brandController = require('../controllers/brand_controller')
const brandRouter = express.Router()


brandRouter.get('/view/brand/all', brandController.viewAllBrands)
brandRouter.get('/view/brand/:id', brandController.viewBrandsById)




module.exports = brandRouter
