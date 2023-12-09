const { json } = require('body-parser');
const database = require('../models/connection_db')
const brandModel = require('../models/brand_model')

const viewAllBrands = (req,res,next)=>{        
    let selectQuery = 'SELECT * FROM tbl_brand'
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
                message: "No Brands Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Got All Brands ",
                data:rows
            })
        }
    })

}

const viewBrandsById = (req,res,next) =>{
    const id = req.params.id
  
    if(id == null || id == ""){
        res.status(404).json({
            successful:false ,
            message:"Brand ID is missing"
        })
    }
    else{
      
        let query = `SELECT * from tbl_brand WHERE id = ${id}`
  
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
                         message:`successfully Founded Brand ID: ${id} `,
                         data:rows         
                    })
                }
                else{
                    res.status(400).json({
                        successful:false ,
                        message:"Brand ID does not exist"
                    }) 
                }
            }
        })
    }
}

module.exports = {
    viewAllBrands,
    viewBrandsById
}