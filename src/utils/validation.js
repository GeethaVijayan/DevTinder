/*
  these utils folders are helper functions
  first when api gets hit ->it will check payload params are valid or not 
   if its valid it will encrypt password and other confidential data and store it in db
*/

const validateSignupData = (req) =>{
     const {firstName,lastName,email,password} = req.body;
     if(!firstName || !lastName){
        throw new Error("FirstName is required")
     }
     else if(firstName.length <4 || firstName.length >=15){
        throw new Error("FirstName should be 4 to 15 characters")
     }

}

module.exports = {validateSignupData}