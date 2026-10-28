const express = require("express");

const userRouter = express.Router();
const {userAuth} = require("../middleware/auth") ;
const connectionRequest = require("../models/connectionRequest");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills"

//Get all the connectionRequest of logged In user (lets's check who are all interested in me)
userRouter.get('/user/requests/received', userAuth , async(req,res)=>{
    /*user validation will be checked in userAUth 
      * 1. Get all pending connection request for loggedIn user
    usecaase of this api 
      If I'm getting request once i will check what are all recquest i received based ob that i will accept or reject
      */
try{
      const loggedInUser = req.user;
      console.log(loggedInUser,'user')
      /**to know what are all request caame for loggedIn user wwe need to see in connectionRequest table which holds data */

      const connectionRequest = await ConnectionRequestModel
                                 .find({toUserId: loggedInUser._id, status:"interested"})
                                .populate("fromUserId","firstName lastName photoUrl,gender,age ") //(populate means we are filtering out the data we are showing we can write it in string or in belowcase array both are same)
                                //  .populate("fromUserId",["firstName","lastName"])  //(we are providing refeerence to user model and from there propulating first and lastname)
             
     res.json({message:"Data fetched Successfully",data:connectionRequest})

}catch(err){
    res.status(500).json({messsage: "ERROR Message" + err})
}

})


/**I need to find All connectionRequest of loggedInUser where elon cn be toUser and Elon can be fromUser  
 *  e.g:  Geetha -> Akshay   Akshay accepted  (here Geetha is fromUser)
 *        Diya  -> Geetha   Geetha Accepted   (here Geetha is toUser)
 *    we need to write get Request to find all the connectionRequest of User(Geetha both from & to)
 * 
*/


 userRouter.get('/user/connections', userAuth, async(req,res)=>{

   try{

      const loggedInuser = req.user;
       
      /**
       * here 
       * 1.findind or conidtion either condiition satisifes i need to get result
       *   1)toUserId ,status:Accepted - LoggedInuser sends request and it got Accepted 
       *   2)fromUserId ,status:Accepted -  LoggedInuser accepts the request which comes to him/her
       *   3) once after finding userDetails from connectioModel we are populating details of user firstname , lastname 
       *      from usertable already given ref:user(already we are giving ref to fromId of CnnectionModel)
       */
      const connectionRequest = await ConnectionRequestModel.find({
          $or: [
            {toUserId : loggedInuser._id , status: "Accepted"},
            {fromUserId: loggedInuser._id, status: "interested"}

          ]
          }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)

          /**after receving userconnetion details we are mapping that connection details and displaying */

          const data = connectionRequest.map((row) => {
               if(row.fromUserId._id.toString() === loggedInuser._id.toString()){
              return row.toUserId;
             }
             return row.fromUserId;
          });
           
      res.json({data});
   }catch(err){
    res.status(500).json({message:"Error message "+ err})
   }



 })



module.exports = userRouter;
