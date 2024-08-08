import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../compoents/Navbar";
export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className="py-3">
            <Navbar/>
            <div className="signup w-[90%] mt-20 m-auto shadow-lg min-h-[90vh]">
                <div className="header bg-black text-white text-center py-4">
                    <h1 className="mt-3 text-xl md:text-2xl">Welcome Back</h1>
                    <h1 className="mt-3 text-xl md:text-2xl">Login Now</h1>
                </div>
                <div className="body">
                    <form className="form py-3">
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Email</label>
                            <input
                                type="email"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Password</label>
                            <input
                                type="password"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <h1 className="mt-2">Do not have an account <Link className="text-blue-800" to={'/signup'}>SignUp</Link></h1>
                        </div>
                        <div className="form-group w-[75%] m-auto mt-6 text-center">
                            <button className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
