const express = require('express');

const app = express(); //new instance of express
const {adminAuth,userAuth} = require("./middleware/authRoutes");

/**
 * how to handle codde 
 * what happens if incoming request hits server 
 * 
 */



//this app.use is known as request handler. it will handle all incoming requests to the server

// app.use("/testroute",(req,res)=>{
//     res.send("Hello from routehandler");
// });


//handle auth middleware
 //it wwon't go to other routes itself
app.use("/auth", adminAuth);
app.use("/user", userAuth);
/*this is a middleware function which will handle all incoming requests to the server,any code which is passing over this route matching with / ot will gives this response 
obviously all route starts with / so it will override all routes starts with /test,/hello it will give same response (wildcard route)*/

//to handle all routes 




// app.use("/",(req,res)=>{
//     console.log("incoming request");
//     console.log(req.url);
//     console.log(req.method);
//     console.log(req.headers);
//     res.send("Hello from express.js");
// })

/***
 * Get call and post call
 * /profile  
 * for same api we can use 2 different methods get and post
 * get call to profile is used to get profile details from server(while seeing profile page to user) and
 *  post call to profile is used to send data to server(while signing we give profile detaails)
 */

app.get("/user/profile",
    (req,res,next)=>{
    console.log("🔥 PROFILE ROUTE");
    //console.log("QUERY:", req.query);
        res.send({firstname: "John", lastname: "Doe"});
     next();
    },
    (req,res,next)=>{
        console.log("🔥 PROFILE ROUTE 2");
        res.send("profile Details Saved Successfully");
        next();
    },
    [ (req,res,next)=>{
    console.log("🔥 PROFILE ROUTE 3");
    //console.log("QUERY:", req.query);
        res.send({firstname: "John", lastname: "Doe"});
     next();
    }, (req,res,next)=>{
    console.log("🔥 PROFILE ROUTE 4");
    //console.log("QUERY:", req.query);
        res.send({firstname: "John", lastname: "Doe"});
     next();
    },]
);
app.post("/auth/admin",(req,res)=>{
    res.send("profile saved");
});
app.delete("/auth/admin",(req,res)=>{
    res.send("admin profile deleted");
});

app.get("/auth/admin",(req,res)=>{
        res.send("auth is scuccessful");
});
//order of apicall matters alot
 
/**i need to listen to any port so i can get to know what request is coming */

app.listen(9000,()=>{
    console.log("server is successfully running on port 9000");
});