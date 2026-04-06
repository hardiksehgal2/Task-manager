// server\src\common\config\db.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose'
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
}
export default connectDB
