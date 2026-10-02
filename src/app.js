const express = require('express');

const app = express(); //new instance of express

/**
 * how to handle codde 
 * what happens if incoming request hits server 
 * 
 */
//this app.use is known as request handler. it will handle all incoming requests to the server
app.use((req,res)=>{
    console.log("incoming request");
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    res.send("Hello from express.js");
})
//to handle all routes 

app.use("/testroute",(req,res)=>{
    res.send("Hello from routehandler");
});

/**i need to listen to any port so i can get to know what request is coming */

app.listen(9000,()=>{
    console.log("server is successfully running on port 9000");
});