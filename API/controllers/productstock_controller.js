const { json } = require('body-parser');
const database = require('../models/connection_db')
const prodstockModel = require('../models/productstock_model')

const viewAllProductStocks = (req,res,next)=>{        
    let selectQuery = 'SELECT product_id, size, name, description, quantity, price FROM tbl_productstock  JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id'
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
                message: "No Product Stocks in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Got All Stocks ",
                data:rows
            })
        }
    })

}

const viewByProductstockId = (req,res,next) =>{
    const id = req.params.id
  
    if(id == null || id == ""){
        res.status(404).json({
            successful:false ,
            message:"Product ID is missing"
        })
    }
    else{
      
        let query = `SELECT product_id, size, name, description, quantity, price FROM tbl_productstock INNER JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id  WHERE tbl_productstock.id = ${id}`
  
        database.db.query(query, (err,rows,result)=>{
            if(err){
                res.status(500).json({
                    successful:false,
                    message:err
                })
            }
            else{
                if(rows.length>0){
                        res.status(200).json({
                        successful:true,
                         message:`successfully Founded Product ID: ${id} `,
                         data:rows         
                    })
                }
                else{
                    res.status(400).json({
                        successful:false ,
                        message:"Product ID does not exist"
                    }) 
                }
            }
        })
    }
  }
  

module.exports = {
    viewAllProductStocks,
    viewByProductstockId
}