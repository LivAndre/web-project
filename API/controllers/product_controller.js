const { json } = require('body-parser');
const database = require('../models/connection_db')
const prodModel = require('../models/product_model')


const viewAllProducts = (req,res,next)=>{        
    let selectQuery = `SELECT prod_status, prod_name, prod_brand, prod_category, prod_price, prod_condition, supplier_tbl.supplier_name FROM product_tbl JOIN supplier_tbl ON product_tbl.supplier_id = supplier_tbl.supplier_id `
    database.db.query(selectQuery, (err,rows,result) =>{
        if (err){
            res.status(500).json({
                successful : false,
                message : err
            })   
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Products in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Got All Products ",
                data:rows
            })
        }
    })

}

module.exports = {
    viewAllProducts
}