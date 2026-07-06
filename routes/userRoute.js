import express from 'express'
import { loginController, registerController } from '../controller/userController.js';
import { isAdmin, isSignedIn } from '../middlware/authMiddlware.js';

const route   = express.Router()



route.post("/create-user" , registerController); 
route.post("/login-user" , loginController);

route.get('/user', isSignedIn ,  (req, res) => {
    res.send('User route is working')
})

export default route