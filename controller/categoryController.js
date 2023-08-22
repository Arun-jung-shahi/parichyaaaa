
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;

        // validate
        if(!name){
            return res.status(404).send({
                message:"plz enter the name of category"
            })
        }

        const existingCategory= await categoryModel.findOne({name});
        if(existingCategory){
           return res.status(200).send({
                success:false,
                message:" category already exist"
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)})
        category.save();
        res.status(201).send({
            message:" new category created",
            success:true,
            category,
            
        })
    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success:false,
            message:"category cannot be created",
            error,
        })
    }
}
//update category ko lagi 
export const updateCategoryController=async(req,res)=>{
try {
    const {id}=req.params;
   
    const {name}=req.body;
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    return res.status(200).send({
        success:true,
        message:" category updated",
        category,
    })
} catch (error) {
    console.log(error)
   
    return res.status(404).send({
        success:false,
        message:"category cannot be updated",
        error,
    })
}
}

//get all category
export const getCategoryController=async(req,res)=>{
    try {
        const category = await categoryModel.find({});
         res.status(200).send({
            success:true,
            message:"all category",
            category,
        })
        
    } catch (error) {
        console.log(error)
   
        return res.status(404).send({
            success:false,
            message:"cannot get all category",
            error,
        })       
    }
}


//get single category
export const singleCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params;
        const category = await categoryModel.findOne({slug});
        return res.status(200).send({
            success:true,
            message:"single category",
            category
        })
        
    } catch (error) {
        console.log(error)
   
        return res.status(404).send({
            success:false,
            message:"error while getting single category",
            error,
        })       
    }
}

//  delete category
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
         await categoryModel.findByIdAndDelete(id)
        return res.status(200).send({
            success:true,
            message:" category deleted successfully",
    
        })
        
    } catch (error) {
        console.log(error)
   
        return res.status(404).send({
            success:false,
            message:"cannot be deleted",
            error,
        })       
    }
}



