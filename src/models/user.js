const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


/**
 * Notes to understand 
 * 
 * 1. why schema ? why can't we create model directly 
 * 
 * Schema: Defines the structure of your documents.The schema can also define validation rules, required fields, default values, and more.
Model: Provides methods to interact with your MongoDB collection.
Database: Stores the actual data.

const User = mongoose.model("User");

This is not the normal way to create a new model. Mongoose expects a schema when registering a model that doesn't already exist.

but in other languages theey use models direclty and in models they defiine structure . here we need schema becuase mongoose needs it 
. we aare communicating through mogoose


*/


const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        minlengtgh:4,
        maxlength:10
        },
    lastName: {
        type: String      
    },
    email:{
        type: String,
        required:true,
        unique:true ,
        lowercase:true,
        trim:true,//(whitespaces is removed)      //(emaailId id is unqiue),
        validate (value){
           if(!validator.isEmail(value)){
            throw new Error("Email is not valid");
           }
        }
    },
     password:{
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
               throw new Error("password is not strong" +value)
            }
        }
    },
    age:{
        type: Number,
        min:18,
    },
    gender:{
        type: String,
        enum: {
             values: ['male','female','others'],
             message: `user is not valid gender type `  /**Refer valid enum */
        }
      //custom validation function
        // validate(value){
        //     if(!['male','female','other'].includes(value)){
        //         throw new Error("gender is not valid")
        //     }
        // }
    },
    photoUrl:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        validate(value){
            if(!validator.isURL(value)){
               throw new Error("URL is invalid")
            }
        }
    },
    about:{
        type: String,
        default: "Hey there! I am using ChatApp-I'm default"
    },
    skills: {
        type: [String]  //array of strings
    }
},{timestamps:true} //createdAt and updatedAt will be automatically added to the document
);

//offloading commonly used methods in one helper functions ( these are all used allover the aplication)
// we can attach method to schema to use it for user allover the application

userSchema.methods.getJWT = async function(){
    //here this refers whoever the user logs in . we cannot use arrow function it will collapse
   const user = this;
   
   const token =  await jwt.sign({_id:user._id},"DevTinder@Secretkey$",{expiresIn:"7d"})

   return token;

}

//we can offlod bcrypt comapre also 
userSchema.methods.validatePassword = async function(passwordInputByUser){
    //here this refers whoever the user logs in . we cannot use arrow function it will collapse
   const user = this;
   const passwordHash = user.password
   
   const isPasswordvalid =  await bcrypt.compare(passwordInputByUser,passwordHash);

   return isPasswordvalid;

   return token;

}



//schema is nothing but a modal 
//nowe wil create a mongose model using this schema
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
 