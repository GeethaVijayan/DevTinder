const mongoose = require('mongoose');

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
        trim:true //(whitespaces is removed)      //(emaailId id is unqiue)
    },
     password:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        min:18,
    },
    gender:{
        type: String,
      //custom validation function
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("gender is not valid")
            }
        }
    },
    photoUrl:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
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
//schema is nothing but a modal 
//nowe wil create a mongose model using this schema
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
 