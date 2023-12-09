const { json } = require('body-parser');
const database = require('../models/connection_db')
const categoryModel = require('../models/category_model')

const viewAllCategory = (req,res,next)=>{        
    let selectQuery = 'SELECT * FROM tbl_category'
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
                message: "No Category founded in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Got All Categories ",
                data:rows
            })
        }
    })

}

const viewCategoriesById = (req,res,next) =>{
    const id = req.params.id
  
    if(id == null || id == ""){
        res.status(404).json({
            successful:false ,
            message:"Category ID is missing"
        })
    }
    else{
      
        let query = `SELECT * from tbl_category WHERE id = ${id}`
  
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
                         message:`successfully Founded Category ID: ${id} `,
                         data:rows         
                    })
                }
                else{
                    res.status(400).json({
                        successful:false ,
                        message:"Category ID does not exist"
                    }) 
                }
            }
        })
    }
}

module.exports = {
    viewAllCategory,
    viewCategoriesById
}