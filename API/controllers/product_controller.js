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

const viewNewestToOldest = (req,res,next)=>{        
    let selectQuery = 'SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.name, description, created_at, main_img, left_img, right_img, top_img FROM tbl_product JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id JOIN tbl_category ON tbl_product.category_id = tbl_category.id ORDER BY created_at DESC'
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

const viewOldestToNewest = (req,res,next)=>{        
    let selectQuery = 'SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.name, description, created_at, main_img, left_img, right_img, top_img FROM tbl_product JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id JOIN tbl_category ON tbl_product.category_id = tbl_category.id ORDER BY created_at ASC'
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


const viewNikeSneakers = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Nike' AND type = 'sneakers'`

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

const viewAdidasSneakers = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Adidas' AND type = 'sneakers'`

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

const viewNewBalanceSneakers = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'New Balance' AND type = 'sneakers'`

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

const viewVansSneakers = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Vans' AND type = 'sneakers'`

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

const viewConverseSneakers = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Converse' AND type = 'sneakers'`

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

const viewOthersSneakers = (req,res,next)=>{

    let selectQuery = `Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product JOIN tbl_category ON tbl_product.category_id = tbl_category.id JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id WHERE tbl_brand.name = 'Others' AND type = 'sneakers'`

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


const filterSneakerSizes  = (req,res,next)=>{

    let selectQuery = `
    SELECT tbl_brand.name AS brand_name, type, p.name, description, created_at 
    FROM tbl_product AS p
    JOIN tbl_category ON p.category_id = tbl_category.id 
    JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    JOIN tbl_productstock ON tbl_productstock.product_id = p.id
    WHERE tbl_productstock.size = '4 us' OR tbl_productstock.size = '4.5 us' OR tbl_productstock.size = '5 us'
    OR tbl_productstock.size = '5.5 us' OR tbl_productstock.size = '6 us' OR tbl_productstock.size = '6.5 us'
    OR tbl_productstock.size = '7 us' OR tbl_productstock.size = '7.5 us'` // 4 - 7.5

    // `
    // SELECT tbl_brand.name AS brand_name, type, p.name, description, created_at 
    // FROM tbl_product AS p
    // JOIN tbl_category ON p.category_id = tbl_category.id 
    // JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    // JOIN tbl_productstock ON tbl_productstock.product_id = p.id
    // WHERE tbl_productstock.size = '8 us' OR tbl_productstock.size = '8.5 us' OR tbl_productstock.size = '9 us'
    // OR tbl_productstock.size = '9.5 us' OR tbl_productstock.size = '10 us' OR tbl_productstock.size = '10.5 us'
    // OR tbl_productstock.size = '11 us' OR tbl_productstock.size = '11.5 us'` // 8 - 11.5

     // `
    // SELECT tbl_brand.name AS brand_name, type, p.name, description, created_at 
    // FROM tbl_product AS p
    // JOIN tbl_category ON p.category_id = tbl_category.id 
    // JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    // JOIN tbl_productstock ON tbl_productstock.product_id = p.id
    // WHERE tbl_productstock.size = '12 us' OR tbl_productstock.size = '12.5 us' OR tbl_productstock.size = '13 us'
    // OR tbl_productstock.size = '13.5 us' OR tbl_productstock.size = '14 us'` //12 - 14

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



module.exports = {
    viewAllProducts,
    viewNewArrivals,
    viewNewestToOldest,
    viewOldestToNewest,
    viewNikeSneakers,
    viewAdidasSneakers,
    viewNewBalanceSneakers,
    viewVansSneakers,
    viewConverseSneakers,
    viewOthersSneakers,
    viewSneakerProducts,
    viewApparelProducts,
    viewEssentialProducts,
    viewProductViaProductName,
    filterSneakerSizes
}