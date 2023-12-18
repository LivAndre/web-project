const { json } = require('body-parser');
const database = require('../models/connection_db')
const cartModel = require('../models/cart_model')

const getAllItems = (req, res, next) => {
  const cartId = req.query.cart_id;

  // Validate cart_id
  if (!cartId) {
    return res.status(400).json({
      successful: false,
      message: 'Cart ID is required.'
    });
  }

  const retrieveCartProducts = 'SELECT * FROM tbl_cart WHERE id = ?';

  database.db.query(retrieveCartProducts, [cartId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error(checkErr);

      return res.status(500).json({
        successful: false,
        message: 'Internal Server Error'
      });
    }

    if (checkResult.length > 0) {
      const items = checkResult.map(item => ({
        id: item.id,
        productId: item.productstock_id,
      }));

      return res.status(200).json({
        successful: true,
        message: `Cart ID: ${cartId}, Items:`,
        items: items
      });
    } else {
      return res.status(404).json({
        successful: false,
        message: `No Items in Cart: ${cartId}`
      });
    }
  });
};

const addToCart = (req, res, next) => {
    let productstockId = req.body.productstock_id

    // console.log(productstockId)
    let cartId = req.body.cart_id
  
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

          const retrieveCartProducts = `SELECT COUNT(id) as count FROM tbl_cart WHERE id = '${cartId}' AND productstock_id = ${productstockId}`;

          database.db.query(retrieveCartProducts, (error, rows) => {
            if (error) {
              res.status(500).json({
                successful: false,
                message: error
              })
            }
            else{
              // console.log(`rows[0].count: ${rows[0].count} \n checkResult[0].quantity: ${checkResult[0].quantity}`)
                if (rows[0].count+1 > checkResult[0].quantity){
                  res.status(400).json({
                    successful: false,
                    message: "Reached stock limit."
                  })
                }
                else{
                  const insertQuery = 'INSERT INTO tbl_cart (id, productstock_id) VALUES (?, ?)';
                  const values = [cartId, productstockId];
          
                  database.db.query(insertQuery, values, (err, rows, result) => {
                    if (err) {
                      res.status(500).json({
                        successful: false,
                        message: err
                      })
                    } else {
                      res.status(200).json({
                        successful: true,
                        message: `Successfully added product to cart!`
                      })
                    }
                  })
                }
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
    deleteItem,
    getAllItems
}