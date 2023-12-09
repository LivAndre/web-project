const { json } = require('body-parser');
const database = require('../models/connection_db')
const userModel = require('../models/user_model')

const viewAllUsers = (req,res,next)=>{        
    let selectQuery = 'SELECT * FROM tbl_user'
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
                message: "No Users Found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Got All Users ",
                data:rows
            })
        }
    })

}

const viewUserById = (req,res,next) =>{
    const id = req.params.id
  
    if(id == null || id == ""){
        res.status(404).json({
            successful:false ,
            message:"User ID is missing"
        })
    }
    else{
      
        let query = `SELECT * from tbl_user WHERE id = ${id}`
  
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
                         message:`successfully Founded User ID: ${id} `,
                         data:rows         
                    })
                }
                else{
                    res.status(400).json({
                        successful:false ,
                        message:"User ID does not exist"
                    }) 
                }
            }
        })
    }
}

module.exports = {
    viewAllUsers,
    viewUserById
}