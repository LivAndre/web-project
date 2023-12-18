const express = require('express')
const cartConroller = require('../controllers/cart_controller')
const { cart_model } = require('../models/cart_model')
const cartRouter = express.Router()


cartRouter.post('/add-to-cart',cartConroller.addToCart ) 
cartRouter.delete('/remove/:id',cartConroller.deleteItem)



module.exports = cartRouter
