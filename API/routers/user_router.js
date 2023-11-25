const express = require('express')
const userController = require('../controllers/user_controller')
const userRouter = express.Router()


userRouter.get('/view/all', userController.viewAllUsers)



module.exports = userRouter
