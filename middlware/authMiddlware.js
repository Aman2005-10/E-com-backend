import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const isSignedIn = async (req, res, next) => {
    try{
         const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).send({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    }
    catch(eroor){
        console.log(eroor);
       
    }

}


export const isAdmin = async (req, res , next) => {
    try{
        const user = await User.findById(req.user._id);
        if(user.isAdmin !== true){
            return res.status(403).send({ message: "Access denied For Admin" });
        }
        next();

    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }

}