import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"



//protected routes base toekn 
//aaba token matcha na bhaya samma tyo routr acess garnu mildina  
export  const requireLogin = async (req,res,next)=>{
    try {
      

    const decode =  JWT.verify
    (req.headers.authorization,
        process.env.JWT_SEC
            ); 
        
        // console.log(req.headers.authorization)
        //verify chai use garincha to verify the users 
    //aaba paila we use req.body tara token chai header.authorization bhitra hucnha ani verify have two things yeuta chai
    //secret key tyo from env use garchau
    
    req.user=decode //it means jaba samma id mildina decode hunna//mathi encrypt gareyou tara decode nai so tala decode garya
    next();


    } catch (error) {
        console.log(error)
        // console.log(req.headers.authorization)
        res.status(404).send({message:"error in login",error,

    })
        
    }

}

export const isAdmin=async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        console.log(user.role)
        if(user.role!==1){//is user.role equal to 1 hoina bhaney tyo unauthorized acess ho 
            //if user admin ho bhaney chai can acess so next ( )call garya 

            return res.status(404).send({
                message:"unauthorized acess",
                success:false
            })
        }
        else{
next();
        }
        
    } catch(error) {
        console.log(err)
        res.status(401).send({
            success:false,
            error,
            message:'error in middlewear'
        })
    }
}
//role 0 bhanya user and 1 bhnaya chai admin
//suru ma user admin ho ki naii check garya 
//user find garya 



// hami ley postman ma run garda unauthorized access aayou cha because hamro tyo role ma 0 cha which means user admin hoina

