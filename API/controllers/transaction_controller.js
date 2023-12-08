const { json } = require('body-parser');
const database = require('../models/connection_db')
const transactionModel = require('../models/transaction_model')

// function generateReferenceNumber() {
//   const characters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
//   let referenceNumber = "";
//   const length = 20;

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     referenceNumber += characters.charAt(randomIndex);
//   }

//   return referenceNumber;
// }


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

module.exports = {
    viewTransactionById
}