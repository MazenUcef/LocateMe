import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';


const mongoUri = process.env.MONGO;
if (!mongoUri) {
    throw new Error("MONGO environment variable is not defined");
}

mongoose.set("strictQuery", true)

mongoose
    .connect("mongodb+srv://mazenafifi1999:mazenafifi1999@locatmee.fdjv6.mongodb.net/?retryWrites=true&w=majority&appName=locatMee")
    .then(() => console.log("connected to database successfully"))
    .catch((error) => console.log("failed to connect to database", error))
const app = express();


app.use(express.json())
app.use(cors())


app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.listen(7000, () => {
    console.log("Server is running on port 7000")
})

