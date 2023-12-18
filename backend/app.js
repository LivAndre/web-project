// IMPORT ALL DEPENDENCIES
const express = require ('express')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')

const database = require("./API/models/connection_db")
database.connectDatabase()

const prodRouter = require('./API/routers/product_router')
const brandRouter = require('./API/routers/brand_router')
const categoryRouter = require('./API/routers/category_router')
const productstockRouter = require('./API/routers/productstock_router')
const userRouter = require('./API/routers/user_router')
const transactionRouter = require('./API/routers/transaction_router')
const cartRouter = require('./API/routers/cart_router')





const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))
app.use(bodyParser.json({limit: "50mb"}))

// DEFINE HEADER SETTINGS 
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")

    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "*")
        return res.status(200).json({})
    }
    next()
})

app.get('/', (req, res, next)=>{
    res.status(200).json({
        succesful: true,
        message: "Test succuss!"
    })
})


app.use('/products', prodRouter)
app.use('/brands', brandRouter)
app.use('/categories', categoryRouter)
app.use('/productstocks', productstockRouter)
app.use('/users', userRouter)  
app.use('/transactions', transactionRouter)  
app.use('/cart', cartRouter)



//ERROR MIDDLEWARE
app.use((req, res, next)=>{
    const error= new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app