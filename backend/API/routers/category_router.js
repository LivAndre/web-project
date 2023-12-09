const express = require('express')
const categoryController = require('../controllers/category_controller')
const categoryRouter = express.Router()


categoryRouter.get('/view/category/all', categoryController.viewAllCategory)
categoryRouter.get('/view/category/:id', categoryController.viewCategoriesById)




module.exports = categoryRouter
