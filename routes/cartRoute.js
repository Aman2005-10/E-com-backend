import express from 'express'
import { createCartController, getCartController } from '../controller/cartController.js'
import { isAdmin, isSignedIn } from '../middlware/authMiddlware.js'


const route   = express.Router()

route.post("/create-cart" , isSignedIn , isAdmin , createCartController)
route.get("/get-cart" , isSignedIn , getCartController)



export default route