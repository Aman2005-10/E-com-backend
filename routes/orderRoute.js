import express from 'express'
import { getAdminOrder, GetUserOrder, orderPlace, updateAdminOrderStatus, updateAdminPaymentStatus } from '../controller/orderController.js';
import { isAdmin, isSignedIn } from '../middlware/authMiddlware.js';

const route = express.Router();

route.post("/order-place" , isSignedIn , orderPlace)
route.get("/get-user-order" , isSignedIn , GetUserOrder)
route.get("/get-admin-order" , isSignedIn , isAdmin , getAdminOrder)
route.put("/order-update/:id" , isSignedIn , isAdmin, updateAdminOrderStatus)
route.put("/payment-update/:id" , isSignedIn , isAdmin, updateAdminPaymentStatus)


route.get("/test" , (req , res) => {
    res.send("I am testing")
})
export default route