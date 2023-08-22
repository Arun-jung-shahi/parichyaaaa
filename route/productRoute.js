import express from "express";
import { requireLogin } from "../middlewear/authMiddlewear.js";

import formidable from 'express-formidable'
import { SingleProductController,createProductController, deleteProductController, 
    getProductController, productCategoryController, productCountController, productFilterController,
    productListController,
    productPhotoController, searchProductController, similarProductController, updateProductController } from "../controller/productController.js";

const router = express.Router()

router.post('/create_products',formidable(),requireLogin,createProductController)
//update products
router.put('/update_product/:pid',requireLogin,formidable(),updateProductController)

// get products
router.get('/get_product',getProductController)

//get single products
router.get('/single_product/:slug',SingleProductController)

//for products
router.get('/product_photo/:pid',productPhotoController)

//delete product
router.delete('/product_delete/:pid',deleteProductController)


//product filter
router.post('/product_filter',productFilterController)

//product count
router.get('/product_count',productCountController)

//geting product on the basic of page pagination
router.get('/product_list/:page',productListController)

//search filter
router.get(`/search/:keyword`,searchProductController)

//similar product
router.get(`/similar/:pid/:cid`,similarProductController)


// category wise product route
router.get(`/product_category/:slug`,productCategoryController)

// payment route
//getting token
// router.get(`/braintree/token`,braintreeTokenController)

//payment r
// router.post(`/braintree/payment`,requireLogin,braintreePaymentController)

export default router;