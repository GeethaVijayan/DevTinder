const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        },
    lastName: {
        type: String      
    },
    email:{
        type: String
    },
     password:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
})
//schema is nothing but a modal 
//nowe wil create a mongose model using this schema
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
 