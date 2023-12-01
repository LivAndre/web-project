const { json } = require('body-parser');
const database = require('../models/connection_db')
const prodModel = require('../models/product_model');
const { NULL } = require('mysql/lib/protocol/constants/types');

const viewAllProducts = (req,res,next)=>{        
    let selectQuery = 'SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.name, description, created_at, main_img, left_img, right_img, top_img FROM tbl_product JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id JOIN tbl_category ON tbl_product.category_id = tbl_category.id'
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

const viewNewArrivals = (req,res,next)=>{        
    let selectQuery = 'SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.name, description, created_at, main_img, left_img, right_img, top_img FROM tbl_product JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id JOIN tbl_category ON tbl_product.category_id = tbl_category.id WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK);'
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

const viewSneakerProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_category.type= 'Sneakers'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Sneakers Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewApparelProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_category.type= 'Apparels'`
    
    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Apparels Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewEssentialProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_category.type= 'Essentials'`
    
    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Essentials Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}


const viewNikeProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Nike'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Nike Products Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewAdidasProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Adidas'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Adidas Products Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewNewBalanceProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'New Balance'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No New Balance Products Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewVansProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Vans'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Vans Products Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewConverseProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Converse'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Converse Products Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}

const viewOthersProducts = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Others'`

    database.db.query(selectQuery,(err,rows,result) =>{

        if(err){
            res.status(500).json({
                successful:false,
                message : err
            })
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: "No Products Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got All Products",
                data : rows
            })
        }
    })
}
const viewProductViaProductName = (req, res, next) => {
    let prodName = req.params.prod_name
  
    if (prodName == null || prodName.trim() === "") {
      res.status(404).json({
        successful: false,
        message: "Product NAME is missing"
      })
    } else {
      let query = `SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.name, description, created_at, main_img, left_img, right_img, top_img FROM tbl_product JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id JOIN tbl_category ON tbl_product.category_id = tbl_category.id WHERE tbl_product.name LIKE ?`
      let searchValue = `%${prodName}%`
  
      database.db.query(query, [searchValue], (err, rows, result) => {
        if (err) {
          res.status(500).json({
            successful: false,
            message: err
          })
        } else {
          if (rows.length > 0) {
            res.status(200).json({
              successful: true,
              message: `Successfully found products with name: ${prodName}`,
              data: rows
            })
          } else {
            res.status(400).json({
              successful: false,
              message: "Product does not exist"
            })
          }
        }
      })
    }
  }




module.exports = {
    viewAllProducts,
    viewNewArrivals,
    viewNikeProducts,
    viewAdidasProducts,
    viewNewBalanceProducts,
    viewVansProducts,
    viewConverseProducts,
    viewOthersProducts,
    viewSneakerProducts,
    viewApparelProducts,
    viewEssentialProducts,
    viewProductViaProductName
}