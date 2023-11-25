const { json } = require('body-parser');
const database = require('../models/connection_db')
const transactionModel = require('../models/transaction_model')

const viewAllTransaction = (req,res,next)=>{        
    let selectQuery = 'SELECT * FROM tbl_transaction'
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
                message: "No Transactions found in the Database"
            })
        }
        else{
            res.status(200).json({
                successful:true,
                message: "Successfully Got All Transactions ",
                data:rows
            })
        }
    })

}

module.exports = {
    viewAllTransaction
}