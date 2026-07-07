import express from 'express'
import { createProduct } from '../controller/productController.js'
import upload from '../middlware/multer.js';


const route  = express.Router();

route.post("/create-product" , upload.single("image") , createProduct)

export default route