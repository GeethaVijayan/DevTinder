const jwt = require('jsonwebtoken');
const User = require("../models/user")


const userAuth = async (req,res,next) =>{
    try{
            //Read the token from the cookie in req.body and validate the token  aad find the user 

         const cookies = req.cookies;
    const {token} = req.cookies;

    if(!token){
       throw new Error("token is not valid/expired")
    }
          //after token validation it will directly give response not any boolean val so 
    const decodeMsg = await jwt.verify(token,"DevTinder@Secretkey$")
    const {_id} = decodeMsg;
    
    const user = User.findById(_id);
     if(!user){
        throw new Error("user not found")
     }
     req.user = user
     //since it is a middleware we are using next(once response is success next will go to request hanlder nd calls the appropriate function)
     next(user)

    }catch(err){
        res.status(400).send("ERROR"+err)
    }
  
}

module.exports = {
    userAuth
}