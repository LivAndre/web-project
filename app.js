
const express = require ('express')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')

const db = require("./API/models/connection_db")
db.connectDatabase()

const router = require('./API/routers/product_router')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")

    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "*")
        return res.status(200).json({})
    }
    next()
})


app.use('/products', prodRouter)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404 
    next(error)
}) 

app.use((error, req, res, next) => {
    res.status = (error.status || 500)
    res.json({
        error:{
            message : error.message
        }
    })
})

module.exports = app