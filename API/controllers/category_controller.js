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

module.exports = {
    viewAllCategory
}