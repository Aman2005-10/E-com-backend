import { comparePassword, hashPassword } from '../helper/authhelper.js';
import User from '../models/userModel.js'
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
   
    return res.status(200).send({ message: "Login successful",
         user:{
            name: user.name,
            email: user.email,     
            },
     
        
        });


   } 
   catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
   }
}