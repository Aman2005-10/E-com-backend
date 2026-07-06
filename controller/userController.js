import { comparePassword, hashPassword } from '../helper/authhelper.js';
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';
export const registerController = async (req , res) => {
    try {
        const { name , email , password } = req.body;

        if(!name || !email || !password) {
            res.status(400).send({ message: "Please fill all the fields" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            res.status(400).send({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new  User({
            name,
            email,
            password: hashedPassword
        }).save();

        res.status(201).send({ message: "User created successfully", user });

    } catch (error) {   
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


export const loginController = async (req , res) => {
   try{
    const { email , password } = req.body;

    if(!email || !password) {
        res.status(400).send({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if(!user) {
        res.status(400).send({ message: "User does not exist" });
    }
    
    const ismatch = await comparePassword(password , user.password);
    if(!ismatch) {
        res.status(400).send({ message: "Invalid password" });
    }

    const token = await jwt.sign({_id:user._id} , process.env.JWT_SECRET , { expiresIn: "1d" });

    if(!token) {
        res.status(400).send({ message: "Token generation failed" });
    }

   
    return res.status(200).send({ message: "Login successful",
         user:{
            name: user.name,
            email: user.email,     
            },
     token
        
        });


   } 
   catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
   }
}