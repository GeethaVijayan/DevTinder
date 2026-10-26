/**
 * This model will define connection between 2 models
 * There will be user A sending connectionRequest to User B
 */

const mongoose = require('mongoose');


const ConnectionRequestSchema = new mongoose.Schema({
     fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required:true  /**unique user Id */
     },
     toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
     },
     status:{
        type:String,
        enum :
          {
            values: ['ignored','interested','Accepted','Rejected'],
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



const ConnectionRequestModel = mongoose.model('ConnectionRequestModel', ConnectionRequestSchema);

module.exports = ConnectionRequestModel;