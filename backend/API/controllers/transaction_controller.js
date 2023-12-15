const { json } = require('body-parser');
const database = require('../models/connection_db')
const transactionModel = require('../models/transaction_model')

function generateReferenceNumber() {
  const characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let referenceNumber = "";
  const length = 20;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referenceNumber += characters.charAt(randomIndex);
  }

  return referenceNumber;
}


const viewTransactionById = (req, res, next) => {
    const id = req.params.id

    if(id == null || id == ""){
        res.status(404).json({
            successful:false ,
            message:"Transaction ID is missing"
        })
    }
    else{
        const selectQuery = `
    SELECT
    productstock_id, tbl_product.name AS product_name, CONCAT(tbl_user.first_name, ' ', tbl_user.last_name) AS full_name , tbl_user.email,  tbl_user.address, tbl_user.contact_number, reference_number, date_of_purchase, tbl_productstock.price, mode_of_payment
    FROM tbl_transaction
    JOIN tbl_productstock ON tbl_transaction.productstock_id = tbl_productstock.id
    JOIN tbl_user ON tbl_transaction.user_id = tbl_user.id
    JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id
    WHERE
    tbl_transaction.id = ${id}`
    database.db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(500).json({
          successful: false,
          message: err.message
        })
      } else {
        if (result.length === 0) {
          res.status(400).json({
            successful: false,
            message: "No transaction found"
          })
        } else {
          res.status(200).json({
            successful: true,
            message: `Successfully Founded Transaction`,
            data : result
          })
        }
      }
    })  
    }
  
    

}

const viewTransactionByReferenceNumber = (req, res, next) => {
  const reference_number = req.params.reference_number

  if (reference_number === null || reference_number === "") {
    res.status(404).json({
      successful: false,
      message: "Reference Number is missing"
    })
  } else {
    const selectQuery = `
      SELECT
        productstock_id, tbl_product.name AS product_name, CONCAT(tbl_user.first_name, ' ', tbl_user.last_name) AS full_name, tbl_user.email, tbl_user.address, tbl_user.contact_number, reference_number, date_of_purchase, tbl_productstock.price, mode_of_payment
      FROM tbl_transaction
        JOIN tbl_productstock ON tbl_transaction.productstock_id = tbl_productstock.id
        JOIN tbl_user ON tbl_transaction.user_id = tbl_user.id
        JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id
      WHERE reference_number = '${reference_number}'  `

    database.db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(500).json({
          successful: false,
          message: err.message
        })
      } else {
        if (result.length === 0) {
          res.status(400).json({
            successful: false,
            message: "Invalid Transaction"
          })
        } else {
          res.status(200).json({
            successful: true,
            message: `Successfully Found Transaction`,
            data: result
          })
        }
      }
    })
  }

}
const addTransaction = (req, res, next) => {
  const productStockId = req.body.productstock_id
  const userId = req.body.user_id
  const mode_of_payment = req.body.mode_of_payment //ETO DAPAT GCASH LANG
  const referenceNumber = generateReferenceNumber() //REFERENCE NUMBER CAN STILL REPEAT KASI WALA PANG CODES ABOUT DON.

  if (!productStockId || !userId || !mode_of_payment) {
    res.status(404).json({
      successful: false,
      message: "One or more transaction details are missing."
    })
    return
  }

  
  const checkUserQuery = 'SELECT * FROM tbl_user WHERE id = ?'
  const userValues = [userId]

  database.db.query(checkUserQuery, userValues, (userErr, userResult) => {
    if (userErr) {
      res.status(500).json({
        successful: false,
        message: userErr.message
      })
      return
    }
    if (userResult.length === 0) {
      res.status(400).json({
        successful: false,
        message: "Invalid user id. User does not exist."
      })
      return
    }

    const checkProductStockQuery = 'SELECT * FROM tbl_productstock WHERE id = ?'
    const productStockValues = [productStockId]

    database.db.query(checkProductStockQuery, productStockValues, (productStockErr, productStockResult) => {
      if (productStockErr) {
        res.status(500).json({
          successful: false,
          message: productStockErr.message
        })
        return
      }

      if (productStockResult.length === 0) {
        res.status(400).json({
          successful: false,
          message: "Invalid Product Stock Id. Product stock does not exist."
        })
        return
      }

      const getPriceAndQuantityQuery = 'SELECT price, quantity FROM tbl_productstock WHERE id = ?'
      const getPriceAndQuantityValues = [productStockId]

      database.db.query(getPriceAndQuantityQuery, getPriceAndQuantityValues, (getPriceAndQuantityErr, getPriceAndQuantityResult) => {
        if (getPriceAndQuantityErr) {
          res.status(500).json({
            successful: false,
            message: getPriceAndQuantityErr.message
          })
          return
        }

        const prodQuantity = getPriceAndQuantityResult[0].quantity

        if (prodQuantity === 0) {
          res.status(400).json({
            successful: false,
            message: "Product is out of stock."
          })
          return
        }

        const prodPrice = getPriceAndQuantityResult[0].price

        const updatedQuantity = prodQuantity - 1
        const updateQuantityQuery = 'UPDATE tbl_productstock SET quantity = ? WHERE id = ?'
        const updateQuantityValues = [updatedQuantity, productStockId]

        // Update the quantity in the productstock_tbl
        database.db.query(updateQuantityQuery, updateQuantityValues, (updateErr, updateResult) => {
          if (updateErr) {
            res.status(500).json({
              successful: false,
              message: updateErr.message
            })
            return
          }

          const insertTransactionQuery = 'INSERT INTO tbl_transaction (productstock_id, user_id, reference_number, price, mode_of_payment) VALUES (?, ?, ?, ?, ?)'
          const insertTransactionValues = [productStockId, userId, referenceNumber,  prodPrice, mode_of_payment]

          database.db.query(insertTransactionQuery, insertTransactionValues, (insertErr, insertResult) => {
            if (insertErr) {
              res.status(500).json({
                successful: false,
                message: insertErr.message
              })
              return
            }

            res.status(200).json({
              successful: true,
              message: "Transaction added successfully."
            })
          })
        })
      })
    })
  })
}

  
module.exports = {
    viewTransactionById,
    viewTransactionByReferenceNumber,
    addTransaction
}