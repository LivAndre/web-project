const express = require('express')
const transactionController = require('../controllers/transaction_controller')
const transactionRouter = express.Router()


transactionRouter.get('/view/transaction/:id', transactionController.viewTransactionById)



module.exports = transactionRouter
