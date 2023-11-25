const express = require('express')
const categoryController = require('../controllers/category_controller')
const categoryRouter = express.Router()


categoryRouter.get('/view/all', categoryController.viewAllCategory)



module.exports = categoryRouter
