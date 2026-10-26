const express = require("express");
const {userAuth} = require("../middleware/auth") ;
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user")


const connectionRequestRouter = express.Router();

connectionRequestRouter.post('/SendConnectionRequest',userAuth, async (req,res)=>{
  console.log("inside connectionrequest")
  const user = req.user;
  res.status(200).send( user.firstName +"ConnectionRequest sent")
})


connectionRequestRouter.post('/request/send/:status/:toUserId',userAuth, async (req,res)=>{
  /**we are having 4 different status we are trying to add all 4 status , acccepted,rejected,ignore,interested 
   * first we are sending connection request from user A to B 
   *  1. if i like some person i will sent like (send connection from user A to B mentioning status like)
   *  //ignore will also make api call
   *  2. if i dislike some person i will sent ignore (send connection from user A to B mentioning status dislike)
   * 
  */
  const user = req.user;
try{
    const  toUserId = req.params.toUserId;
    const  fromUserId = req.user._id;
    const  status = req.params.status;

      
    
    /**
     * i can retrieve user frstname from UserID
     */
     const connectionRequest = new ConnectionRequestModel({
           fromUserId : fromUserId,
           toUserId : toUserId,
           status: status
     })
     console.log(connectionRequest,'ConnectionReqquest')
     const allowedStatus = ["interested","ignored"]
     if(!allowedStatus.includes(status)){
       return res.status(400).send("status is invalid")
     }

     const toUser = await User.findById(toUserId);
     if(!toUser){
      res.status(400).send("user not found")
     }

/**Validation check to find user exist in db or not */
     const toUserExist = await User.findById(toUserId);
    
     if(!toUserExist){
       return res.status(400).send("user does not exist in db");
     }

     //validdation check : what if existing user wants to send connectionRequest Once again
 /**
  *  /*
   * for example 
   * if user A already sent connection to user B what if uuser B
   * user B aalso wants to send connection to user A (anyway both are same we shouldn't allow the same connection so we are checking that)
   * 
   * anyway we won't see db level entry becuase db won't accept but we want to handle it via api also thaats why we are doing this case
   * /
   
  */
     const isExistingConnectionCheck = await ConnectionRequestModel.findOne({
      $or : [
        { fromUserId,toUserId},
        {fromUserId:toUserId , toUserId:fromUserId}
      ]
     });
       console.log(isExistingConnectionCheck,'isExisting')
     if(isExistingConnectionCheck){
      return res.status(400).send({message : "connection Request already Present"})
     }

    
     const result =  await connectionRequest.save();
    if(!result){
      throw new Error("Connection Failed")
    }
    res.json({
      message: req.user.firstName + "has" + status + "the" + toUser.firstName})

}catch (err) {
  console.error("Connection request error:", err);
  res.status(500).json({
    message: "Failed to send connection request",
    error: err.message
  });
}
})



module.exports = connectionRequestRouter;