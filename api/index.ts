import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';


const mongoUri = process.env.MONGO;
if (!mongoUri) {
    throw new Error("MONGO environment variable is not defined");
}


// ✅ Mongoose settings
mongoose.set("strictQuery", true); // Suppress deprecated warning for strict mode
mongoose.set("autoIndex", true); // Automatically create indexes
mongoose.set("bufferCommands", false); // Disable command buffering

mongoose
    .connect(mongoUri)
    .then(() => console.log("connected to database successfully"))
    .catch(() => console.log("failed to connect to database"))
const app = express();


app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})