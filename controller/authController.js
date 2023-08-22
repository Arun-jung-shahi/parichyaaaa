import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

import { comparePassword, hashpassword } from './../helper/authHelper.js';




 export const registerController =async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer} =req.body;
        // validations
        if(!name){
            return res.send({message:"name is required"});
        }
        if(!email){
            return res.send({message:"email is required"});
        }
        if(!password){
            return res.send({message:"password is required"});
        }
        if(!phone){
            return res.send({message:"phone is required"});
        }
        if (!address) {
          return res.send({ message: "address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
          }
      
        
        //existing users 
        const existingUsers= await userModel.findOne({email})
        if(existingUsers){
            return res.status(200).send({
                success:false,
                message:"already registered"
            });
        }
        //to register
        const hashedPassword=await hashpassword(password) //paila password lai hash garya
        const user= await new userModel({name,email,phone,address,password: hashedPassword, answer,});
          user.save();//saving in database
         res.status(201).send({
         success:true,
           message:'you are registered',
           user,
           
        });
    
    } catch (error) {
        console.log(error)
         res.status(404).send({
            success:false,
            message:" error on registration",
        error,
        })
        
    }
}
//login 
export const logincontroller =async(req,res)=>{
    try {
        const {email,password}=req.body
//validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"plz enter email password",
                
            })
        }
        //to check users ko email registerd bhako cha ki naii

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"email isnt registered",
           
        })
    }
        //to login

 const match = await comparePassword(password,user.password);
 if(!match){
    return res.status(200).send({
        success:false,
        message:"invalid password",
      
    })
 }
//token it means kati time ma  expire hucnha after login .sign to create token id ko base ma token banako for authntictaion
const token = await JWT.sign({_id:user._id},process.env.JWT_SEC,{expiresIn:'7d'});
res.status(200).send({
    message:"login sucessful",
    success:true,
    user:{
        name: user.name,
        email:user.email,
        phone:user.phone,
        address:user.address, 
        role:user.role

    },
    token,//token dincha yesley teskai base ma roue lai protect  garchau hami
})

    } catch (error) {

        return res.status(404).send({
          success:false,
            message:"error in login",
            error,
        })

        
    }
}

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashpassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};





//require login test of token for security purpose 

 export const testController= (req,res)=>{
try {
     res.status(200).send({
        message:"protected route",
        success:true,
    })
} catch (error) {
    console.log(error);
    res.send({error})
}
 }

 export const updateProfileController = async (req,res)=>{
  try {
    const {name,email,password,address,phone}=req.body
    const user=await userModel.findById(req.user._id)

    //password
    if(password && password.length < 6){
      return res.json({error: "Passsword is required and 6 character long"});
    }

    
    const hashedPassword=password ? await hashpassword(password):undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  }
   catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      message:"error while updating profile",
      error,
    })
  }
 }