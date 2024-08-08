import { useState } from "react";
import upload from "../asset/images/upload.webp";
import { Link } from "react-router-dom";
import Navbar from "../compoents/Navbar";
export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fileimg, setFileimg] = useState('')
    const [img, setImg] = useState('')
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        alert(file)
        setImg(URL.createObjectURL(file))
        setFileimg(file)
    };
    return (
        <div className="py-3">
            <Navbar/>
            <div className="signup w-[90%] mt-20 m-auto shadow-lg min-h-[90vh]">
                <div className="header bg-black text-white text-center py-4">
                    <div class="image-upload">
                        <label for="file-input">
                            {
                                img ?
                                <img src={img} className="w-24 h-24 rounded-full m-auto hover:cursor-pointer" />
                                : 
                                <img src={upload} className="w-24 h-24 rounded-full m-auto hover:cursor-pointer" />
                            }
                        </label>
                        <input id="file-input" type="file" className="hidden" onChange={handleImageChange} />
                    </div>
                    <h1 className="mt-3 text-xl md:text-2xl">Signup Now</h1>
                </div>
                <div className="body">
                    <form className="form py-3">
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">User Name</label>
                            <input
                                type="text"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Email</label>
                            <input
                                type="email"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Birth Date</label>
                            <input
                                type="date"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setBirthDate(e.target.value) }}
                            />
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Password</label>
                            <input
                                type="password"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setPassword(e.target.value) }}

                            />
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                            <h1 className="mt-2">Have an account <Link className="text-blue-800" to={'/signin'}>Login</Link></h1>
                        </div>
                        <div className="form-group w-[75%] m-auto mt-6 text-center">
                            <button className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200">
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
