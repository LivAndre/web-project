const express = require('express')
const transactionController = require('../controllers/transaction_controller')
const transactionRouter = express.Router()


transactionRouter.get('/view/transaction/:id', transactionController.viewTransactionById)
transactionRouter.get('/view/transaction/reference/:reference_number', transactionController.viewTransactionByReferenceNumber)




module.exports = transactionRouter
