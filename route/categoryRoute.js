import  express  from "express";
// import { requireLogin } from "../middlewear/authMiddlewear.js";
import { createCategoryController
    , deleteCategoryController,
     getCategoryController, 
     singleCategoryController, 
     updateCategoryController } from "../controller/categoryController.js";
import { isAdmin, requireLogin } from "../middlewear/authMiddlewear.js";


const router = express.Router();
//creating category
router.post('/create_category',requireLogin,isAdmin,createCategoryController)
// yesma you need to add login and admin

//update category
router.put('/update_category/:id',requireLogin,isAdmin,updateCategoryController);
// is admin yesma pani you have to put

//get all category
router.get('/get_category',getCategoryController) 
// in this we dont need middlewear

//get single category 
router.get('/single_category/:slug',singleCategoryController)

//delete category
router.delete('/delete_category/:id',requireLogin,isAdmin,deleteCategoryController)

export default router;


