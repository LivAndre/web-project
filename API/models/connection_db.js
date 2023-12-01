

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database : "beyondshoegame_db"
})

const connectDatabase = ()=>{
    db.connect((error) =>{
        if(error){
            console.log("Error Connecting to database")
        }
        else{
            console.log("successfully connected to database")
        }
    })
}

module.exports = {
    db,
    connectDatabase
}