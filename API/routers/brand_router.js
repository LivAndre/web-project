const express = require('express')
const brandController = require('../controllers/brand_controller')
const brandRouter = express.Router()


brandRouter.get('/view/all', brandController.viewAllBrands)



module.exports = brandRouter
