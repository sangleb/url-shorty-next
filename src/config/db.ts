import mongoose from "mongoose";

const connectDB = async () => {
    // console.log(process.env.MONGODB_URI as string);
    return mongoose.connect(process.env.MONGODB_URI as string);
}

export default connectDB;