 import express from "express";
 import {registerController,
    logincontroller,
    testController,
    forgotPasswordController,
    updateProfileController
} from "../controller/authController.js";
 import { isAdmin, requireLogin } from "../middlewear/authMiddlewear.js";


 const router=express.Router();
 
//post method for registrations
 router.post('/register',registerController)


 //post method for login
 router.post('/login',logincontroller)

//forget password
router.post("/forgot-password", forgotPasswordController);

 //for testing a token security
 router.get('/test',testController)


//  protected route
 router.get('/user-auth',requireLogin,(req,res)=>{
     res.status(200).send({
        "ok":true
    });

})

  
// protected route for admin
router.get('/admin-auth',requireLogin,isAdmin,(req,res)=>{
    res.status(200).send({
       ok:true
   });

})

//update profile

router.put(`/profile`,requireLogin,updateProfileController)

 export default router;