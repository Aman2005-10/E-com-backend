import express from 'express'
import { loginController, registerController } from '../controller/userController.js';

const route   = express.Router()



route.post("/create-user" , registerController); 
route.post("/login-user" , loginController);

route.get('/user', (req, res) => {
    res.send('User route is working')
})

export default route