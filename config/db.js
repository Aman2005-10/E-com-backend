import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.Mongo_URL)
        console.log(`MongoDB Connected Successfully`);

    } catch{
        console.log("Error in connecting to database");

    }
}
export default connectDB;