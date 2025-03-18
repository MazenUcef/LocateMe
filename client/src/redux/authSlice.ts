import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface LoginPayLoad {
    username: string;
    email: string;
    password: string;
}

export interface User {
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    status: boolean;
    token: string;
    user: User;
}

export const signUpUser = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }: LoginPayLoad, { rejectWithValue }) => {
        try {
            const res = await axios.post<LoginResponse>("/api/auth/signup", {
                username,
                email,
                password
            })
            if (res.data.status) {
                return res.data.user;
            } else {
                throw new Error('Login Faild');
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
)



const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as User | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
})

export default authSlice.reducer;