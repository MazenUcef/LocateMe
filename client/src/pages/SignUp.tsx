import { useState } from "react"
import { Link } from "react-router"
import { useSignUp } from "../hooks/authHooks/useSignUp";
import { User } from "../redux/authSlice";

const SignUp = () => {
    const [formData, setFormData] = useState<User>({
        username: "",
        email: "",
        password: "",
    })
    const { signup, isPending, isError, error } = useSignUp();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signup(formData)
    }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-[#1b4866] text-center font-bold my-7"> Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    placeholder="username"
                    type="text"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    placeholder="email"
                    type="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    placeholder="password"
                    type="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button disabled={isPending} type="submit" className="bg-[#1b4866] cursor-pointer font-bold text-white rounded-lg uppercase p-3 hover:bg-[#cda057] hover:text-[#1b4866]">
                    {isPending ? "Signing up..." : "Sign Up"}
                </button>
                {isError && <p className="text-red-500">{error}</p>}
            </form>
            <div className="flex gap-2 items-center mt-5">
                <p className="text-[#1b4866]">Have an account ?</p>
                <Link to={'/sign-in'}>
                    <span className="text-[#cda057]">Sign in</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp