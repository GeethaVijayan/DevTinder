const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth") 


/**profile Route (view Profile) */

profileRouter.get("/profile",userAuth,async (req,res)=>{
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


module.exports = profileRouter;