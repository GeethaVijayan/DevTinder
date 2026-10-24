const express = require("express");
const {userAuth} = require("../middleware/auth") 

const connectionRequestRouter = express.Router();

connectionRequestRouter.post('/SendConnectionRequest',userAuth, async (req,res)=>{
  console.log("inside connectionrequest")
  const user = req.user;
  res.status(200).send( user.firstName +"ConnectionRequest sent")
})



module.exports = connectionRequestRouter;