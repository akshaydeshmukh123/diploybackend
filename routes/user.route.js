const express=require("express");
const {userModel}=require("../../backend/model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{

    const {email,password,name,age}=req.body
try {

    bcrypt.hash(password,5,async(err,hash)=>{
        const user=new  userModel({email,password:hash,name,age});
        await user.save();
        res.status(200).send(({"msg":"new user has beeb created"}))
        
    })
    
} catch (error) {
    res.status(400).send({"err":error.message})
}

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
       const user= await userModel.findOne({email:email});
       if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
                const   token = jwt.sign({authorID:user._id,author:user.name }, 'shhhhh');
        res.status(200).send({"msg":"login successfull","token":token})
            }else{
                res.status(400).send({"msg":"wrong creaditionals!!!"})
            }
            
        });
     
       }else{
        res.status(400).send({"msg":"wrong creaditionals!!!"})
       }
    } catch (error) {
        res.status(400).send({"err":error.message})
        
    }



})

module.exports={
    userRouter
}

