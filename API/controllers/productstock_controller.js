const { json } = require('body-parser');
const database = require('../models/connection_db')
const prodstockModel = require('../models/productstock_model')

const viewAllProductStocks = (req,res,next)=>{        
    let selectQuery = 'SELECT * FROM tbl_productstock'
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

module.exports = {
    viewAllProductStocks
}