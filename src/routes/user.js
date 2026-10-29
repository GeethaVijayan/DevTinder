const express = require("express");

const userRouter = express.Router();
const {userAuth} = require("../middleware/auth") ;
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user") 

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
   }catch(err){9
    res.status(500).json({message:"Error message "+ err})
   }



 })


/**Building feed API */
  /** feed- user should see all user cards 
   *  Except
   *  1)Usser should npt see his own card in the feed
   *  2)user should not see whom he has previously accepted , 
   * 3)ignored
   * 4)already send connection request
   */


userRouter.get('/user/feed', userAuth, async(req,res)=>{
      console.log("inside feed",req.user_id)
   try{
      const loggedInuser = req.user;

      /**Adding Pagination *
       * It can be dynamic if user adds in reqquest as querypaaram we take thaat else we put it aas default
       *   eg: /user/feed?page=1&limit=10; - we need to show frst(0-10) 10 records in page 1/
       */
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      /**we need to set condition for limit  */

      limit = limit > 50 ? 50: limit;
      const skip = (page-1) * limit;

      


    //step-1: I need to find all the connectionRequest which i have sent or received 
        console.log(loggedInuser, loggedInuser._id)
      const connectionRequest = await ConnectionRequestModel.find({
         $or: [
            {toUserId : loggedInuser._id },
            {fromUserId: loggedInuser._id}

          ]
      }).select("fromUserId toUserId").populate("fromUserId", "firstName")
                                      .populate("toUserId", "firstName")

       /**now connectionRequest will show request whom i sent or whom i received so these are the people i shouldn't see in my profile */
   /**so these are people i dont want to see in my feed */

   const hideUsersFromFeed = new Set();
      connectionRequest.forEach((req)=>{
  hideUsersFromFeed.add(req.fromUserId._id.toString()),
  hideUsersFromFeed.add(req.toUserId._id.toString())
      })
      console.log('hideUsersFromFeed',hideUsersFromFeed)
    /** now we got who are all previously sent request to us aand we have rejected or accepted .now we need to hide these users 
     *  and sshow new users in feed
     */

    /**here $nin is not in meaning mongodb query shows users who are not iin hideusersfromfeed
     *      $ne - not equal to 
     *       $and
     *       $or,   
     */
    console.log("insidebefore query",)
    const users = await User.find({
      $and: [
         { _id:{$nin: Array.from(hideUsersFromFeed)}},
         { _id : {$ne: loggedInuser._id }} ]
    }).select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

      res.send(users);

     

   }catch(err){
    res.status(500).json({message:"ERR message " + err})
   }


})



module.exports = userRouter;
