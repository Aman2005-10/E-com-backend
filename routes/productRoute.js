import express from 'express'
import { createProduct, deleteController, getAllProductCont, getProductById } from '../controller/productController.js'
import upload from '../middlware/multer.js';
import { isAdmin, isSignedIn } from '../middlware/authMiddlware.js';


const route  = express.Router();

route.post("/create-product" , isSignedIn  , isAdmin , upload.single("image") , createProduct)
route.delete("/delete-product/:id" , isSignedIn , isAdmin , deleteController)
route.get("/get-all" , isSignedIn ,  getAllProductCont)
route.get("/get-one/:id" , isSignedIn , getProductById)


export default route