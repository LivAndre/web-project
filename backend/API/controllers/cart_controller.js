const { json } = require('body-parser');
const database = require('../models/connection_db')
const cartModel = require('../models/cart_model')



const addToCart = (req, res, next) => {
    let productstockId = req.body.productstock_id
  
    // Check if productstockId exists in tbl_productstock
    const checkProductQuery = 'SELECT * FROM tbl_productstock WHERE id = ?'
    database.db.query(checkProductQuery, [productstockId], (checkErr, checkResult) => {
      if (checkErr) {
        res.status(500).json({
          successful: false,
          message: checkErr
        })
      } else {
        if (checkResult.length > 0) {
          const insertQuery = `INSERT INTO tbl_cart SET ?`
          const cartObj = cartModel.cart_model(productstockId)
  
          database.db.query(insertQuery, cartObj, (err, rows, result) => {
            if (err) {
              res.status(500).json({
                successful: false,
                message: err
              })
            } else {
              res.status(200).json({
                successful: true,
                message: "Successfully added Product to cart!"
              })
            }
          })
        } else {
          res.status(400).json({
            successful: false,
            message: "ProductstockId does not exist in tbl_productstock"
          })
        }
      }
    })
  }

  const deleteItem = (req, res, next) => {
    const id = req.params.id
  
    const deleteQuery = 'DELETE FROM tbl_cart WHERE id = ?'
  
    database.db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          successful: false,
          message: err
        })
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({
            successful: true,
            message: `Successfully Removed Product`
          })
        } else {
          res.status(400).json({
            successful: false,
            message: "Cart ID does not exist"
          })
        }
      }
    })
  }
  
module.exports = {
    addToCart,
    deleteItem
}