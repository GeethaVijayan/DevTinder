const express = require("express");
// const db = require('./config/database'); //importing database connection file
const connectDB = require("./config/database"); //importing database connection file
const app = express(); //new instance of express why we need express.json wheneevr i'm reading request it needsto be parsed  
const authRouter = require("../src/routes/auth.js");
const connectionRequestRouter = require("../src/routes/connectionRequest.js");
const profileRouter = require("../src/routes/profile.js");
const userRouter = require("../src/routes/user.js");
const cors = require("cors"); //importing cors middleware


const cookieParser = require("cookie-parser") //it reads cookie or say parse the cookies nnut once we clear cookies it shows {} 

//first conect to database and then start listening  the server(order-mateters)

connectDB()
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to db", err);
    process.exit(1);
  });

/**middleware to handle cors error */
/**Though application is logged in successful we cannot save cookies because of security reasons 
 * browser doesn't allow to save cookies from different domain,port due to security reasons so we need to whitelist them to use them in our application
 * we are adding domain and credentials inside cors to set cookies in application 
 * cors can whitelist origin and credentials to use cookies in application
*/



app.use(express.json()); //middleware to parse json data from request body(converts request json data into javasrcipt object for further use)
app.use(cookieParser()) ; //when  the request comes

app.use(cors({
  origin: "http://localhost:5173", // must exactly match your frontend URL
  credentials: true,               // needed because you're using cookies
}));

/**how to use router jus like how we use middleware same way we are using  */
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRequestRouter);
app.use("/",userRouter);








app.listen(9000, () => {
  console.log("server is successfully running on port 9000");
});
