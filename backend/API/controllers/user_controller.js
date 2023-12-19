const { json } = require('body-parser')
const database = require('../models/connection_db')
const userModel = require('../models/user_model')
const util = require('./util')

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

const addUser = (req, res, next) => {
    const firstName = req.body.first_name
    const lastName = req.body.last_name
    const address = req.body.address
    const email = req.body.email
    const contact_number = req.body.contact_number
  
    if (!firstName || !lastName || !address || !email || !contact_number) {
      res.status(404).json({
        successful: false,
        message: "One or more user details are missing."
      })
    }
    else if (util.checkNumbers(firstName) || util.checkNumbers(lastName) || util.checkSpecialChar(firstName) || util.checkSpecialChar(lastName)){
        res.status(400).json({
          successful :false, 
          message: "Invalid Name Format"
        })
      }
    else if (!util.checkAddress(address)){
      res.status(400).json({
        successful :false, 
        message: "Invalid Address format. It should contain the user's city in the address"
      })
    }
    else if(!util.checkEmail(email) || !email.endsWith(".com")){
      res.status(400).json({
        successful: false,
        message: "Incorrect Email Format. Email must have '@' and '.com "
      })
    }
    else if(util.checkCharacters(contact_number) || util.checkSpecialChar(contact_number) || !contact_number.startsWith('0') || contact_number.length !== 11){
        res.status(400).json({
          successful: false,
          message: "Incorrect Contact Format"
        })
      }
    else{          
            const insertQuery = `INSERT INTO tbl_user set ?`
            const userObj = userModel.user_model(firstName, lastName, address, email, contact_number)
  
            database.db.query(insertQuery, userObj, (err, rows,  result) => {
              if (err) {
                res.status(500).json({
                  successful: false,
                  message: err
                })
              } else {
                res.status(200).json({
                  successful: true,
                  message: "Successfully added new user!",
                  id: rows.insertId
                })
              }
            })
          
        
      
    } 
    
  }

module.exports = {
    viewAllUsers,
    viewUserById,
    addUser
}