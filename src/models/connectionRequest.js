/**
 * This model will define connection between 2 models
 * There will be user A sending connectionRequest to User B
 */

const mongoose = require('mongoose');


const ConnectionRequestSchema = new mongoose.Schema({
     fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required:true  /**unique user Id */,
        ref:"User"     //reference to UserCollection -reference is reference of usser collection(it connects both the table user and connection)
     },
     toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
     },
     status:{
        type:String,
        enum :
          {
            values: ['ignored','interested','accepted','rejected'],
            message: `status is incorrect status type`
         },
         required:true
     } 
} ,{
    timestamps:true
})

//eg: of compund Index
//ConnectionRequest to find ({fromUserId:293, toUserId:93233})
//both from and touser will start in index ascending order for 2 fields
ConnectionRequestSchema.index({fromUserId:1, toUserId:1})



ConnectionRequestSchema.pre("save", async function(){
     const connectionRequest = this;
     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
       throw new Error("you cannot connection request to yourself")
     }
})


/**There is a concept of pre which can acts as a middleware and check cnditions and once sussceess passes to next handler */

/**we are doing vaalidation check over - we cannot send connection request to ourself */



const ConnectionRequestModel = mongoose.model('ConnectionRequest', ConnectionRequestSchema,'connectionrequestmodels');

module.exports = ConnectionRequestModel;