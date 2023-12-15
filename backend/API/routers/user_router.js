const express = require('express')
const userController = require('../controllers/user_controller')
const userRouter = express.Router()


userRouter.get('/view/user/all', userController.viewAllUsers)
userRouter.get('/view/user/:id', userController.viewUserById)
userRouter.post('/add-user',userController.addUser ) 




module.exports = userRouter
