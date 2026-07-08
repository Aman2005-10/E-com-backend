import express from 'express'
import { createCartController, decreaseQuantity, getCartController, increaseQuantity, removeCart } from '../controller/cartController.js'
import { isAdmin, isSignedIn } from '../middlware/authMiddlware.js'


const route   = express.Router()

route.post("/create-cart" , isSignedIn , isAdmin , createCartController)
route.get("/get-cart" , isSignedIn , getCartController)

route.delete("/delete-cart/:id" , isSignedIn , isAdmin , removeCart)
route.put("/increase-quantity/:id", increaseQuantity);
route.put("/decrease-quantity/:id", decreaseQuantity);

export default route