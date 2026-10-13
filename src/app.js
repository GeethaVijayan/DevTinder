const express = require('express');
// const db = require('./config/database'); //importing database connection file
 const connectDB = require('./config/database'); //importing database connection file
const User = require('./models/user'); //importing user model

const app = express(); //new instance of express
//first conect to database and then start listening  the server(order-mateters)
connectDB().then(()=>{
    console.log("Connected to DB successfully");
}).catch((err)=>{
    console.log("Error while connecting to db", err);
    process.exit(1);
})

app.use(express.json()); //middleware to parse json data from request body(converts request json data into javasrcipt object for further use)
    // const user = new User( {
app.post('/signup',async (req,res)=>{
   
    console.log("Request body", req.body);
     //whenever we do any db operations best practice is to add try catch block 
     try{
        
        const user = new User(req.body);
    await user.save();
     res.send("User added successfully");
     }catch(err){
        console.log("Error while saving user", err);
        res.status(500).json({message:"Internal server error"});
     }
})
 
//feed api - geet all users from db
app.get('/feed',async (req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        console.log("Error while fetching users", err);
        res.status(500).json({message:"Internal server error"});
    }
});

//get user by email
app.get('/user',async (req,res)=>{
    const email = req.body.email;

    try{
         const user = await User.findOne({email:email}).exec();
         if(!user){
            res.status(404).send("user not found");
         }else{
            res.send(user);
         }
    }catch(err){
         res.status(500).send("user not found");
    }

});

//get user by id
app.get('/user',async (req,res)=>{
    const email = req.body.email;

    try{
         const user = await User.findById({email:email}).exec();
         if(!user){
            res.status(404).send("user not found");
         }else{
            res.send(user);
         }
    }catch(err){
         res.status(500).send("user not found");
    }

});

//get all users

app.get('/user',async (req,res)=>{
    const email = req.body.email;

    try{
         const user = await User.findOne();
         res.send (user);
         if(!user){
            res.status(404).send("user not found");
         }else{
            res.send(user);
         }
    }catch(err){
         res.status(500).send("user not found");
    }

});

app.delete('/user',async (req,res)=>{
    const userId = req.body.userId;
    console.log("userId", userId);
    try{
            const user = await User.findByIdAndDelete({_id:userId});
            if(!user){
                res.status(404).send("user not found");
            }else{
                res.send("user deleted successfully");
            }
    }catch(err){
        res.status(500).send("Error while deleting user");
    }
})

// app.patch('/user',async (req,res)=>{
//     // const userId = req.body.userId;
//     // const data = req.body;
//     console.log("Request body", req.body);
//     const {userId,...data} = req.body;
//     console.log("userId", userId);
//     console.log("data", data);
//       try{
//         const user = await User.findByIdAndUpdate({_id:userId},data,{ new: true, runValidators: true });
//         if(!user){
//             res.status(404).send("user not found");
//         }else{
//             res.send(user);
//         }
//       }catch(err){
//         res.status(500).send("Error while updating user");
//       }
// })



/**i need to listen to any  port so i can get to know what request is coming */
 app.patch('/user/:userId', async (req, res) => {
    console.log("Request body:", req.params);
    const userId = req.params?.userId;
    const data = req.body;
    try {
    const ALLOWED_UPDATES = [ 'age', 'gender', 'photoUrl','skills','about','userId'];
    const isAllowedUpdates = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));

    if(!isAllowedUpdates) {
       throw new Error("Invalid updates-Update Not allowed");
    }

    if(!Array.isArray(data.skills) && data.skills !== undefined && data.skills.length < 10) {
        throw new Error("Skills must be an array and within limit 10");
    }
       const user = await User.findByIdAndUpdate(
    userId,
    data,
    { returnDocument: 'after', runValidators: true }
);
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error while updating user: " + err.message);
    }
});

app.listen(9000,()=>{
    console.log("server is successfully running on port 9000");
});
