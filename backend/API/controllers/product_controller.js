const { json } = require('body-parser');
const database = require('../models/connection_db')
const prodModel = require('../models/product_model');
const { NULL } = require('mysql/lib/protocol/constants/types');


const viewProductViaProductName = (req, res, next) => {
    let prodName = req.params.prod_name
  
    if (prodName == null || prodName.trim() === "") {
      res.status(404).json({
        successful: false,
        message: "Product NAME is missing"
      })
    } else {    
      let query = `
      SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.name, description, created_at, main_img, 
      back_img, top_img 
      FROM tbl_product JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id 
      JOIN tbl_category ON tbl_product.category_id = tbl_category.id 
      WHERE tbl_product.name LIKE ?`
      
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

const viewAllProducts = (req,res,next)=>{        
    let selectQuery = `
    SELECT tbl_brand.name AS brand_name , tbl_category.type, p.id, p.name, p.description, p.created_at, 
    p.main_img, p.back_img, p.top_img , min_price.min_price
    FROM tbl_product AS p
    JOIN (
        SELECT product_id, MIN(price) AS min_price
        FROM tbl_productstock
        GROUP BY product_id
    ) AS min_price ON p.id = min_price.product_id
    JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    JOIN tbl_category ON p.category_id = tbl_category.id `
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
    let selectQuery = `
    SELECT tbl_brand.name AS brand_name, tbl_product.id, tbl_category.type, tbl_product.name, description, created_at, main_img, 
    back_img, top_img,  min_price.min_price
    FROM tbl_product
    JOIN (
        SELECT product_id, MIN(price) AS min_price
        FROM tbl_productstock
        GROUP BY product_id
    ) AS min_price ON tbl_product.id = min_price.product_id
    JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id 
    JOIN tbl_category ON tbl_product.category_id = tbl_category.id 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)
    `
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
    let selectQuery = `
    SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.id, tbl_product.name, tbl_product.description, tbl_product.created_at, 
    tbl_product.main_img, tbl_product.back_img, tbl_product.top_img , min_price.min_price
    FROM tbl_product 
    JOIN (
        SELECT product_id, MIN(price) AS min_price
        FROM tbl_productstock
        GROUP BY product_id
    ) AS min_price ON tbl_product.id = min_price.product_id
    JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id 
    JOIN tbl_category ON tbl_product.category_id = tbl_category.id 
    ORDER BY created_at DESC`
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
                count: rows.length,
                data:rows
            })
        }
    })

}

const viewOldestToNewest = (req,res,next)=>{        
    let selectQuery = `
    SELECT tbl_brand.name AS brand_name , tbl_category.type, tbl_product.id, tbl_product.name, tbl_product.description, tbl_product.created_at, 
    tbl_product.main_img, tbl_product.back_img, tbl_product.top_img , min_price.min_price
    FROM tbl_product 
    JOIN (
        SELECT product_id, MIN(price) AS min_price
        FROM tbl_productstock
        GROUP BY product_id
    ) AS min_price ON tbl_product.id = min_price.product_id
    JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id 
    JOIN tbl_category ON tbl_product.category_id = tbl_category.id 
    ORDER BY created_at ASC`
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
                count: rows.length,
                data:rows
            })
        }
    })

}

const viewLowestToHighest = (req,res,next)=>{        
    let selectQuery = `
    SELECT tbl_brand.name AS brand_name , tbl_category.type, p.id, p.name, p.description, p.created_at, 
    p.main_img, p.back_img, p.top_img , min_price.min_price
    FROM tbl_product AS p
    JOIN (
        SELECT product_id, MIN(price) AS min_price
        FROM tbl_productstock
        GROUP BY product_id
    ) AS min_price ON p.id = min_price.product_id
    JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    JOIN tbl_category ON p.category_id = tbl_category.id 
    ORDER BY min_price.min_price ASC
    `
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
                count: rows.length,
                data:rows
            })
        }
    })

}

const viewHighestToLowest = (req,res,next)=>{        
    let selectQuery = `
    SELECT tbl_brand.name AS brand_name , tbl_category.type, p.id, p.name, p.description, p.created_at, 
    p.main_img, p.back_img, p.top_img , min_price.min_price
    FROM tbl_product AS p
    JOIN (
        SELECT product_id, MIN(price) AS min_price
        FROM tbl_productstock
        GROUP BY product_id
    ) AS min_price ON p.id = min_price.product_id
    JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    JOIN tbl_category ON p.category_id = tbl_category.id 
    ORDER BY min_price.min_price DESC
    `
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
                count: rows.length,
                data:rows
            })
        }
    })

}







const filterSneakerSizes  = (req,res,next)=>{

    let size = req.body.size

    let selectQuery = `
    SELECT tbl_brand.name AS brand_name, type, p.name, description, created_at 
    FROM tbl_product AS p
    JOIN tbl_category ON p.category_id = tbl_category.id 
    JOIN tbl_brand ON p.brand_id = tbl_brand.id 
    JOIN tbl_productstock ON tbl_productstock.product_id = p.id
    WHERE  ` 

    for (let i = 0; i<size.length; i++){
        if (i < size.length - 1){
            selectQuery += `tbl_productstock.size = '${size[i]}' OR `
        }
        else{
            selectQuery += `tbl_productstock.size = '${size[i]}'`
        }
        
    }


    // tbl_productstock.size = '4 us' OR tbl_productstock.size = '4.5 us' OR tbl_productstock.size = '5 us'
    // OR tbl_productstock.size = '5.5 us' OR tbl_productstock.size = '6 us' OR tbl_productstock.size = '6.5 us'
    // OR tbl_productstock.size = '7 us' OR tbl_productstock.size = '7.5 us' OR tbl_productstock.size = '8 us' OR tbl_productstock.size = '8.5 us' OR tbl_productstock.size = '9 us'
    //  OR tbl_productstock.size = '9.5 us' OR tbl_productstock.size = '10 us' OR tbl_productstock.size = '10.5 us'
    //  OR tbl_productstock.size = '11 us' OR tbl_productstock.size = '11.5 us' OR tbl_productstock.size = '12 us' OR tbl_productstock.size = '12.5 us' OR tbl_productstock.size = '13 us'
    //  OR tbl_productstock.size = '13.5 us' OR tbl_productstock.size = '14 us'


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
                message: "No Products with that size in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got Sizes",
                data : rows
            })
        }
    })
}


const filterSneakerBrands  = (req,res,next)=>{

    let brands = req.body.brands
    let type = req.body.type

    let selectQuery = `
    Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product 
    JOIN tbl_category ON tbl_product.category_id = tbl_category.id 
    JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id 
    WHERE `
    
    for (let i = 0; i<brands.length; i++){
        if (i < brands.length - 1){
            selectQuery += `tbl_brand.name = '${brands[i]}' OR `
        }
        else{
            selectQuery += `tbl_brand.name = '${brands[i]}'`
        }
        
    }

    selectQuery += `AND type - '${type}'`
    // tbl_brand.name = 'nike' OR tbl_brand.name = 'adidas' OR tbl_brand.name = 'new balance' OR tbl_brand.name = 'vans'  
    // OR tbl_brand.name = 'converse' OR tbl_brand.name = 'others' AND type = 'sneakers'` 

    
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
                message: "No Products with that Brand in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got Brand/s",
                data : rows
            })
        }
    })
}

const filterProductCategory  = (req,res,next)=>{

    let category = req.body.category
   
    let selectQuery = `
    Select tbl_brand.name AS brand_name, type, tbl_product.name, description, created_at FROM tbl_product 
    JOIN tbl_category ON tbl_product.category_id = tbl_category.id 
    JOIN tbl_brand ON tbl_product.brand_id = tbl_brand.id 
    WHERE ` 

    for (let i = 0; i<category.length; i++){
        if (i < category.length - 1){
            selectQuery += `tbl_category.type = '${category[i]}' OR `
        }
        else{
            selectQuery += `tbl_category.type = '${category[i]}'`
        }
        
    }


    // tbl_category.type= 'sneakers' OR tbl_category.type= 'apparels' OR tbl_category.type= 'essentials'

    
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
                message: "No Product/s in the database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message : "Successfuly got Products",
                data : rows
            })
        }
    })
}

const updateImageQuery = (req,res,next)=>{      
    
    const id = req.body.id; 
    const url = req.body.url;
    
    let updateQuery = `
    UPDATE tbl_product SET top_img = ? Where id = ?
    `
    database.db.query(updateQuery, [url, id], (err,rows,result) =>{
        if (err){

            console.log(err)
            res.status(500).json({
                successful : false,
                message : err
            })   
        }
        else if (rows.length <= 0){
            res.status(400).json({
                successful:false,
                message: ""
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Updated Product ",
                data:rows
            })
        }
    })

}



module.exports = {
    viewAllProducts,
    viewNewArrivals,
    viewNewestToOldest,
    viewOldestToNewest,
    viewLowestToHighest,
    viewHighestToLowest,
    updateImageQuery,
    viewProductViaProductName,
    filterSneakerSizes,
    filterSneakerBrands,
    filterProductCategory
}