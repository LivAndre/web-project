const http = require('http')

const app = require('./app')

const port = 8080 //NOT FINALLL

const server = http.createServer()

server.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})