const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const {
  validateEditProfileDetails,
  validateSignupData,
} = require("../utils/validation");
const User = require("../models/user"); //importing user model

/**profile Route (view Profile) */

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  /*
      when profile api is called since its after login 
      it will validate a cookie to find user is authenticates
    */
  try {
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
  } catch (err) {
    res.status(400).send("ERROR MESSAGE" + err);
  }
});

//edit profile eg:change username
/**
 *
 */
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  console.log("inside patch");
  try {
    /**when i get user details from request
     * i need to get
     */
    if (!validateEditProfileDetails(req)) {
      throw new Error("Edit is not allowed");
    }

    const loggedInUser = req.user; /**Auth user is aattached  */
    console.log(loggedInUser, "loggedInUser beforeEdit");
    /**from the req.body we can get to know who is the logges in user since it is passing validations hence assigning loggedinuser
     * to edit the fields in user
     */

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    /***
     * Object.keys(req.body) it will print all fields in req.body
     * looping that and assigning loggedInUser[key] with new edit data in that way we can replace old data with new one
     */
    console.log(loggedInUser, "afterEdit");
    await loggedInUser.save();

    /**res.send( `${loggedInUser.firstName}, your profile is updated successfully`) */
    /**we can send the response in json format */
    res.json({
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR Message" + err);
  }
});

//forgot password API
/**
 * logi
 * user enter email & click forgotpassword
 * we need to check whether he is existing user or not mapping existing email in db
 * once he is user  we will (backendAPI)generate a secure reset token
 * we will send him a password reset link in email
 * Return a generic response that doesn't reveal whether the account exists.
 */
profileRouter.patch("/profile/forgotpassword", async (req, res) => {
  const email = req.body.email;
  console.log(email, "email");
  try {
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const token = await user.getJWT();
    console.log(token, "new reset token");
    res.status(200).json({
      message:
        "If an account exists, password reset instructions will be sent.",
    });
  } catch (err) {
    res.status(400).send("ERROR MESSAGE" + err);
  }
});

module.exports = profileRouter;
