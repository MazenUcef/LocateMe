import { Link } from "react-router"

const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-[#1b4866] text-center font-bold my-7"> Sign Up</h1>
            <form className="flex flex-col gap-4">
                <input
                    placeholder="username"
                    type="text"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input
                    placeholder="email"
                    type="email"
                    className="border p-3 rounded-lg"
                    id="email"
                />
                <input
                    placeholder="password"
                    type="password"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                <button className="bg-[#1b4866] cursor-pointer font-bold text-white rounded-lg uppercase p-3 hover:bg-[#cda057] hover:text-[#1b4866]">Sign up</button>
            </form>
            <div className="flex gap-2 items-center mt-5">
                <p>Have an account ?</p>
                <Link to={'/sign-in'}>
                    <span className="text-[#1b4866]">Sign in</span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp