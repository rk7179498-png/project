import mongoose, { connect } from "mongoose";

const connectDb=async(req,res)=>{
    try {
       await mongoose.connect(process.env.MONGODB_API_KEY)
       console.log("connect db") 
    } catch (error) {
        console.log(error)
    }
   
}
export default connectDb