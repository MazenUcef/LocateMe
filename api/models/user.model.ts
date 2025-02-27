import mongoose, { Document } from "mongoose";


interface User extends Document{
    username: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model<User>("User", userSchema)

export default User; 