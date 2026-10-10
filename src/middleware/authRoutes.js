 const adminAuth = (req,res,next)=>{
    const token = "xyzdnlkn";
    const admin = token === "xyz";
    if(admin){
        next();
    }else{
        res.status(401).send("Unauthorized");
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyzdnwkldn";
    const user = token === "xyz";
    if(user){
        next();
    }else{
        res.status(401).send("Unauthorized");
    }
}

module.exports = {adminAuth,userAuth};