// server\index.js
import app from "./src/app.js"
import connectDB from "./src/common/config/db.js"
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000

const start = async () =>{
    await connectDB();
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT ${PORT}`)
    })
}

start().catch((err)=>{
    console.error("Failed to start the app ", err);
    process.exit(1);
})
