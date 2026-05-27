import mongoose from "mongoose";

const  connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
        console.log("MONGO URI:", process.env.MONGODB_URI);
    }catch(error){
        console.log("DB error", error);
    }
};

export default connectDB;