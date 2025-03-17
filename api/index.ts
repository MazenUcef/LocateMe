import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import createHttpError, { HttpError } from 'http-errors';

const mongoUri = process.env.MONGO;
if (!mongoUri) {
    throw new Error("MONGO environment variable is not defined");
}

mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
const app = express();


app.use(express.json())
app.use(cors())


app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)


app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Route not found"))
})

app.listen(7000, () => {
    console.log("Server is running on port 7000")
})


app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",
    });
});


