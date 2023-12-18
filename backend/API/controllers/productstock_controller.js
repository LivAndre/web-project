const { json } = require('body-parser');
const database = require('../models/connection_db')
const prodstockModel = require('../models/productstock_model')

const viewAllProductStocks = (req,res,next)=>{        
    let selectQuery = `
    SELECT product_id, size, name, description, quantity, price 
    FROM tbl_productstock  
    JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id`

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
      
        let query = `
        SELECT product_id, tbl_productstock.id as stock_id, tbl_brand.name as brand_name, size, main_img, back_img, top_img, tbl_product.name, 
        description, quantity, price 
        FROM tbl_product 
        INNER JOIN tbl_productstock ON tbl_productstock.product_id = tbl_product.id 
        INNER JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id
        WHERE tbl_product.id = ${id}`
  
        database.db.query(query, (err,rows,result)=>{
            if(err){
                res.status(500).json({
                    successful:false,
                    message:err
                })
            }
            else{
                if(rows.length>0){
                    formatProductStockDetails(rows, (newRows)=>{
                        res.status(200).json({
                            successful:true,
                             message:`successfully Founded Product ID: ${id} `,
                             data:newRows         
                        })
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


  const viewSizesByProductId = (req,res,next) =>{
    const id = req.params.id
  
    if(id == null || id == ""){
        res.status(404).json({
            successful:false ,
            message:"Product ID is missing"
        })
    }
    else{
      
        let query = `
        SELECT tbl_productstock.product_id, GROUP_CONCAT(tbl_productstock.size) AS all_sizes, tbl_product.name, tbl_productstock.quantity, tbl_productstock.price 
        FROM tbl_productstock
        INNER JOIN tbl_product ON tbl_productstock.product_id = tbl_product.id 
        WHERE tbl_product.id = ${id}
        GROUP BY tbl_productstock.product_id, tbl_product.name, tbl_productstock.quantity, tbl_productstock.price
        `
  
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

const formatProductStockDetails = (rows, callback)=>{

    let productDetails = {
        product_id: rows[0].product_id,
        name: rows[0].name,
        description: rows[0].description,
        brand_name: rows[0].brand_name,
        main_img: rows[0].main_img,
        back_img: rows[0].back_img,
        top_img: rows[0].top_img
    }

    let stockDetails = []

    for (let i in rows){
        let el = rows[i]
        stockDetails.push({
            stock_id: parseInt(el.stock_id),
            size: parseFloat(el.size.replace(" us", "")),
            quantity: parseInt(el.quantity),
            price: parseFloat(el.price)
        })
    }

    let newRows = {
        product_details: productDetails,
        stock_details: stockDetails
    }

    callback(newRows)

}

module.exports = {
    viewAllProductStocks,
    viewByProductstockId,
    viewSizesByProductId
}