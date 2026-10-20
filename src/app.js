const express = require("express");
// const db = require('./config/database'); //importing database connection file
const connectDB = require("./config/database"); //importing database connection file
const User = require("./models/user"); //importing user model
const { validateSignupData } = require("../src/utils/validation");
const app = express(); //new instance of express why we need express.json wheneevr i'm reading request it needsto be parsed  
const bcrypt = require("bcrypt");
const validator = require("validator")
const cookieParser = require("cookie-parser") //it reads cookie or say parse the cookies nnut once we clear cookies it shows {} 
const jwt = require("jsonwebtoken")
const {userAuth} = require("../src/middleware/auth")

//first conect to database and then start listening  the server(order-mateters)

connectDB()
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log("Error while connecting to db", err);
    process.exit(1);
  });

app.use(express.json()); //middleware to parse json data from request body(converts request json data into javasrcipt object for further use)
app.use(cookieParser()) ; //when  the request comes
// const user = new User( {
app.post("/signup", async (req, res) => {
  //whenever we do any db operations best practice is to add try catch block
  try {
    //1.validate signupData
    console.log("Request body", req.body);
    validateSignupData(req);
    //2.Encrypt password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //creating new instance of user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    console.log("Error while saving user", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  //enter cred and validate and acknowledge (gives access)
console.log("in",req.body,'req',req)
try{

    const {email,password} =req.body;
  /**
   * 1. get enetered email and check validation
   *   1.1 entered email id is valid or not
   *   1.2 enntered email id is present in db or no
   *   1.3 take enteered password and compare wiith userdb password 
   *   1.4 match both with bcrypt.compare if success login success else login fail
   */

    if(!validator.isEmail(email)){
        
                throw new Error("Email is not valid");
     }
      const user = await User.findOne({email:email})
      if(!user){
        //Say invalid cred , nneverever puposely provide error details -this is information leak.
         //we don't know whether its failing in userid or password
        throw new Error("Invalid credentials")
      }
      const isPasswordValid = await user.validatePassword(password)

      if(isPasswordValid){
         /**
          * if login is success  generate a JWT token
          * //create a JWT token 
          * 
          */
         //Create a JWT Token 
         //we are hiding this information (eg:user id in the token ) and also giving secret key
         const token = await user.getJWT();
         console.log(token,'token')

         /* * 
          * 1. Add a token inside cookie and send as a response to the request
          * There is default method in express middlewre (need to expolre)  
          */

      

         res.cookie("token",token,{httpOnly:true}, {expires:new Date(Date.now()+8*360000)});
          res.send("Login successful")
      } else{
        throw new Error("Password iss not matched")
      }   


}catch(err){
    console.log("Error while fetching users", err);
    res.status(500).json("Error:"+err.message);
}
})

app.get("/profile",userAuth,async (req,res)=>{
    /*
      when profile api is called since its after login 
      it will validate a cookie to find user is authenticates
    */
   try{
//        const cookies = req.cookies
//       console.log(cookies,'cookie')
//  //validate this token 
//    const {token} = cookies;
//     if(!token){
//       //cookies is rejected and error message is missing
//       throw new Error("invalid credentials")
//     }
  
//  const decodedMsg = jwt.verify(token,"DevTinder@Secretkey$");
//        console.log(decodedMsg)
//         const {_id} = decodedMsg;
//         console.log("The logged in user is"+_id);

//         const finduser = await User.findById(_id);
//         console.log(finduser,'finduser')
//         if(!finduser){
//           throw new Error("user not found ")
//         }

//       res.send(finduser)
       //it give undefined we are unable to read cookie .to read cookie one middleware cookieParser
    //  try{
    //     const {email} = req.body ;
    //     if()
    //  }catch(err){

    //  }

    /**with auth middleware */
    const user = req.user;
    res.status(200).send(user);
   }catch(err){
    res.status(400).send("ERROR MESSAGE"+ err)
   }
})

app.post('/SendConnectionRequest',userAuth, async (req,res)=>{
  console.log("inside connectionrequest")
  const user = req.user;
  res.status(200).send( user.firstName +"SendConnectionRequest sent")
})


app.listen(9000, () => {
  console.log("server is successfully running on port 9000");
});
