import { useState } from "react";
import Verification from "../asset/images/verify.png";
import { Link } from "react-router-dom";
export default function VerificationEmail() {
    const [code,setCode] = useState('')
    return (
        <div className="verification-page flex flex-col w-[75%] m-auto min-h-[80vh] items-center gap-4 py-3 shadow-lg">
            <div className="header bg-black text-white text-center py-4 w-full m-auto">
                <h1 className="mt-3 text-xl md:text-2xl">Verification Email Page</h1>
                <h1 className="mt-3 md:text-xl">Verify Your Email Now</h1>
            </div>
            <div className="img">
                <img src={Verification} className="w-[60vh] h-[50vh]" alt="verification-img" />
            </div>
            <div className="form">
                <h1 className="text-xl md:text-2xl text-center mb-1">Enter The Code</h1>
                <input type="number" className="w-[300px] py-3 px-4 mt-2 bg-gray-200" />
                <h1 className="md:text-xl text-center mt-2">Did not revieve a code <span className="text-blue-800">send again</span></h1>
            </div>
        </div>
    );
}
