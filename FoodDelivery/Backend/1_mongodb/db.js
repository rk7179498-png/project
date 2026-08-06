import mongoose from "mongoose"

export const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connect");
        
    } catch (error) {
        console.error(`error nhai batana hai ${error}`);
        
    }
}