const express=require("express");
const {connection}=require('./db');
const {userRouter}=require("./routes/user.route")
const jwt=require("jsonwebtoken");
const { auth } = require("./middleware/aut.middleware");
const {noteRouter}=require("./routes/note.route")
const app=express();
require("dotenv").config()
const cors=require("cors")

app.use(cors())


app.use(express.json());

app.use("/users",userRouter)





app.use(auth)

app.use("/notes",noteRouter)



app.listen(process.env.port,async()=>{
    try{
await connection
console.log("connected to the db")
    }catch(error){
        console.log(error)
console.log("cannot connect to the database")
    }
    console.log(`server is running on port ${process.env.port}`)
})