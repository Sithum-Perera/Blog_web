import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`DataBase Successfully Connected ^_^`);
    } catch (error) {
        console.log(`Error to connect DataBase`,error);
    }
}