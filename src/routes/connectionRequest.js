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
  const loggedInuser = req.user;
try{
    const  toUserId = req.params.toUserId;
    const  fromUserId = loggedInuser._id;
    const  status = req.params.status;

      console.log("sending UserID", toUserId , "form", fromUserId, status)
    
     const allowedStatus = ["interested","ignored"]
     if(!allowedStatus.includes(status)){
       return res.status(400).send("status is invalid")
     }
    /**
     * i can retrieve user frstname from UserID
     */
     const connectionRequest = new ConnectionRequestModel({
           fromUserId : fromUserId,
           toUserId : toUserId,
           status: status
     })
  
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
      console.log("Duplicate request found:", isExistingConnectionCheck._id);
      return res.status(400).send({message : "connection Request already Present"})
     }

    console.log("Before save");

     const result =  await connectionRequest.save();
    if(!result){
      throw new Error("Connection Failed")
    }
    res.json({
      message: req.user.firstName + "has" + status + "the" + toUserExist.firstName})

}catch (err) {
  console.error("Connection request error:", err);
  res.status(500).json({
    message: "Failed to send connection request",
    error: err.message
  });
}
})

connectionRequestRouter.post('/request/review/:status/:requestID',userAuth, async(req,res)=>{
   console.log("inside review request");

    //before writing any logic 
    /** try to write it theory as steps
     * 1. when loggedin user sends connectionrequest
     * 2.review is something get all review accept and acknowledge whether its pass or fail based on like and dislike
     * 3. first in my db cnnectionrequets i need to check what are all request there for me and 
     * 4. in connectionRequest db i need to check what are all in and 
     */


    //Mahendra sent connection request to Diya
    /**now its Diya bucket for review she has 2 choices like or dislike 
     * first i will login to diyaa user aand get her buckert aand check wwho are all in for review
     * 
     * //mentor theory
     * 1.Mahendra ==>Diyaa
     * 
     * Validation check
     * 1.loggedInuser = toUser(diyaa)
     * 2.status = interested
     * 3.requestID should be valid
     * 
     */
   

    try{
          const loggedInUser = req.user;
 const {status,requestID} = req.params
    const allowedReviewStatus = ['accepted','rejected'] ;
    if(!allowedReviewStatus.includes(status)){
      return res.status(400).json({message:"Status for review is invalid"})
    }
    
    const validRequestId = await User.findOne({_id: requestID})
      if(!validRequestId){
        throw new Error("request id not valid")
      }
      console.log(requestID,loggedInUser._id)
      const connectionReviewRequest = await ConnectionRequestModel.findOne({
    fromUserId: requestID,
    toUserId: loggedInUser._id,
    status: "interested"
});
        if(!connectionReviewRequest){
           return res.status(404).json({message:"connection request not found"})
        }

        connectionReviewRequest.status = status;
const data = await connectionReviewRequest.save();     
 res.status(200).json({message:"Review Requested acknowledged"+ status, data})
    }
    catch(err){
      return res.status(400).send("ERROR Message" + err)
    }


})



module.exports = connectionRequestRouter;