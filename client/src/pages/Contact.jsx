import Navbar from "../compoents/Navbar";
import ContactImg from '../asset/images/contact.png'
import { useState } from "react";
const Contact = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')
    return (
        <div className="contact">
            <Navbar />
            <div className="w-[90%] mt-20 m-auto shadow-lg">
                <div className="header bg-black text-white text-center py-4 w-full m-auto">
                    <h1 className="text-2xl text-center">Contact US</h1>
                </div>
                <div className="mt-3">
                    <img src={ContactImg} alt="contact_image" className="w-[50vh] h-[45vh] m-auto" />
                </div>
                <div className="form-group w-[65%] m-auto mt-4">
                    <label className="md:text-xl">User Name</label>
                    <input
                        type="text"
                        className="w-full py-3 px-4 mt-2 bg-gray-200"
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
                <div className="form-group w-[65%] m-auto mt-4">
                    <label className="md:text-xl">Email</label>
                    <input
                        type="email"
                        className="w-full py-3 px-4 mt-2 bg-gray-200"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="form-group w-[65%] m-auto mt-4">
                    <label className="md:text-xl">Message</label>
                    <input
                        type="text"
                        className="w-full py-3 px-4 mt-2 bg-gray-200"
                        onChange={(e) => { setMessage(e.target.value) }}
                    />
                </div>
                <div className="form-group w-[75%] m-auto mt-6 mb-3 text-center">
                    <button className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Contact;