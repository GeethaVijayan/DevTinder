const express = require('express');
// const db = require('./config/database'); //importing database connection file
 const connectDB = require('./config/database'); //importing database connection file
const User = require('./models/user'); //importing user model

const app = express(); //new instance of express
//first conect to database and then start listening  the server(order-mateters)
connectDB().then(()=>{
    console.log("Connected to DB successfully");
}).catch((err)=>{
    console.log("Error while connecting to db", err);
    process.exit(1);
})


app.post('/signup',async (req,res)=>{
    const user = new User( {
        firstName:'John',
        lastName:'Doe',
        email:'john.doe@gmail.com',
        age:35,
        gender:"male"
    })
    
     //whenever we do any db operations best practice is to add try catch block 
     try{
    await user.save();
     res.send("User added successfully");
     }catch(err){
        console.log("Error while saving user", err);
        res.status(400).send("Error occurred while saving user",err);
     }
})
 
/**i need to listen to any port so i can get to know what request is coming */

app.listen(9000,()=>{
    console.log("server is successfully running on port 9000");
});
