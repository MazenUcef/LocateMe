import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { signUpUser, User } from "../../redux/authSlice";

export const useSignUp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, loading, user } = useSelector((state: RootState) => state.auth);

    const signup = async ({ email, password, username }: User) => {
        if (!email || !password || !username) {
            console.error("All fields are required");
            return;
        }

        try {
            const resultAction = await dispatch(signUpUser({ email, password, username }));
            if (signUpUser.fulfilled.match(resultAction)) {
                navigate("/");
            }
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return {
        signup,
        isPending: loading,
        isError: !!error,
        error,
        user,
    };
};