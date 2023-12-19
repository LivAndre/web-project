const { json } = require('body-parser')
const database = require('../models/connection_db')
const transactionModel = require('../models/transaction_model')

function generateReferenceNumber() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let referenceNumber = ""
  const length = 15

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    referenceNumber += characters.charAt(randomIndex)
  }

  return referenceNumber
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
        tbl_cart.id AS cart_id,
        tbl_product.name AS product_name,
        CONCAT(tbl_user.first_name, ' ', tbl_user.last_name) AS full_name,
        tbl_user.email,
        tbl_user.address,
        tbl_user.contact_number,
        tbl_transaction.reference_number,
        tbl_transaction.date_of_purchase,
        tbl_productstock.price,
        tbl_transaction.mode_of_payment,
        tbl_product.main_img
        FROM tbl_transaction
        JOIN tbl_cart ON tbl_transaction.cart_id = tbl_cart.id
        JOIN tbl_productstock ON tbl_cart.productstock_id = tbl_productstock.id
        JOIN tbl_user ON tbl_transaction.user_id = tbl_user.id
        JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id
        WHERE tbl_transaction.id = ${id}
    
    `
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
      tbl_cart.id AS cart_id,
      tbl_product.name AS product_name,
      CONCAT(tbl_user.first_name, ' ', tbl_user.last_name) AS full_name,
      tbl_user.email,
      tbl_user.address,
      tbl_user.contact_number,
      tbl_transaction.reference_number,
      tbl_transaction.date_of_purchase,
      tbl_productstock.price,
      tbl_transaction.mode_of_payment,
      tbl_product.main_img
      FROM tbl_transaction
      JOIN tbl_cart ON tbl_transaction.cart_id = tbl_cart.id
      JOIN tbl_productstock ON tbl_cart.productstock_id = tbl_productstock.id
      JOIN tbl_user ON tbl_transaction.user_id = tbl_user.id
      JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id
      WHERE reference_number = '${reference_number}'  
      `

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
  const cartId = req.body.cart_id
  const userId = req.body.user_id
  const referenceNumber = generateReferenceNumber()

  if (!cartId) {
    res.status(404).json({
      successful: false,
      message: "Cart ID is missing."
    })
    return
  }
  else if (!userId) {
    res.status(404).json({
      successful: false,
      message: "User ID is missing."
    })
    return
  } else {
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
          message: "Invalid User Id. User does not exist."
        })
        return
      }

      const checkCartQuery = 'SELECT productstock_id FROM tbl_cart WHERE id = ?'
      const cartValues = [cartId]

      database.db.query(checkCartQuery, cartValues, (cartErr, cartResult) => {
        if (cartErr) {
          res.status(500).json({
            successful: false,
            message: cartErr.message
          })
          return
        }

        if (cartResult.length === 0) {
          res.status(400).json({
            successful: false,
            message: "Invalid Cart Id. Cart does not exist."
          })
          return
        }

        const productStockId = cartResult[0].productstock_id // Get the productstock_id from cartResult

        const checkReferenceNumber = 'SELECT * FROM tbl_transaction WHERE reference_number = ?'
        const referenceNumberValue = [referenceNumber]

        database.db.query(checkReferenceNumber, referenceNumberValue, (referenceErr, referenceResult) => {
          if (referenceErr) {
            res.status(500).json({
              successful: false,
              message: referenceErr.message
            })
            return
          }

          if (referenceResult.length === 1) {
            res.status(400).json({
              successful: false,
              message: "Reference Number Already Exists"
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

              const insertTransactionQuery = 'INSERT INTO tbl_transaction (cart_id, user_id, reference_number, price) VALUES (?, ?, ?, ?)'
              const insertTransactionValues = [cartId, userId, referenceNumber, prodPrice]

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
    })
  }
}


  

  
module.exports = {
    viewTransactionById,
    viewTransactionByReferenceNumber,
    addTransaction
}