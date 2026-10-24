/**we create all routers specific to auth */

const express = require("express");


const authRouter = express.Router();

const User = require("../models/user"); //importing user model
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator")
//const cookieParser = require("cookie-parser") //it reads cookie or say parse the cookies nnut once we clear cookies it shows {}



/**1.signup */

authRouter.post("/signup", async (req, res) => {
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


/**2.login Request */

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;