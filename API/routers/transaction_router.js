const express = require('express')
const transactionController = require('../controllers/transaction_controller')
const transactionRouter = express.Router()


transactionRouter.get('/view/all', transactionController.viewAllTransaction)



module.exports = transactionRouter
