import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Verification from "../asset/images/verify.png";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function VerificationEmail() {
    const [code, setCode] = useState(Array(6).fill(""));
    const [isResending, setIsResending] = useState(false);
    const [timer, setTimer] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { email } = useParams();
    const inputsRef = useRef([]);
    const navigate = useNavigate('')
    useEffect(() => {
        sendVerificationCode();
    }, []);

    const sendVerificationCode = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/verification`, { email });
            if (response.data.success) {
                swal("Success", "Verification code sent!", "success");
                startTimer();
            } else {
                swal("Error", "Failed to send verification code.", "error");
            }
        } catch (error) {
            console.log(error)
            swal("Error", "An error occurred while sending the code. Please try again later.", "error");
        }
    };

    const handleVerify = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/check/code`, { email, code: code.join("") });
            if (response.data.success) {
                setSuccess('Verification successful!');
                navigate('/signin')
                setError('');
            } else {
                setError('Invalid code, please try again.');
                setSuccess('');
            }
        } catch (error) {
            console.log(error)
            setError('Error verifying code, please try again later.');
            setSuccess('');
        }
    };

    const handleResend = async () => {
        if (isResending || timer > 0) return;

        setIsResending(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/verification`, { email });
            if (response.data.success) {
                swal("Success", "Verification code resent!", "success");
            } else {
                swal("Error", "Failed to resend code. Please try again.", "error");
            }
        } catch (error) {
            swal("Error", "An error occurred while resending the code. Please try again later.", "error");
        } finally {
            setIsResending(false);
            startTimer();
        }
    };

    const startTimer = () => {
        let time = 60;
        setTimer(time);

        const interval = setInterval(() => {
            time -= 1;
            setTimer(time);

            if (time === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value.slice(-1);
            setCode(newCode);

            if (value && index < 5) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && code[index] === "") {
            if (index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    return (
        <div className="verification-page flex flex-col w-[90%] md:w-[75%] lg:w-[50%] m-auto min-h-[80vh] items-center gap-4 py-3 shadow-lg">
            <div className="header bg-lime-500 text-white text-center py-4 w-full m-auto rounded-lg">
                <h1 className="mt-3 text-2xl md:text-3xl">Verification Email Page</h1>
                <h2 className="mt-1 md:text-xl">Verify Your Email Now</h2>
            </div>
            <div className="img">
                <img src={Verification} className="w-[50vh] h-[40vh] object-contain" alt="verification-img" />
            </div>
            <div className="form">
                <h1 className="text-xl md:text-2xl text-center mb-1">Enter The Code</h1>
                <div className="flex justify-center gap-2">
                    {code.map((num, idx) => (
                        <input
                            key={idx}
                            ref={(el) => inputsRef.current[idx] = el}
                            type="text"
                            value={num}
                            onChange={(e) => handleChange(e, idx)}
                            onKeyDown={(e) => handleBackspace(e, idx)}
                            className="w-10 h-12 text-center text-xl bg-gray-200 border-2 border-lime-500 rounded-lg"
                            maxLength="1"
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
                <h2 className="md:text-xl text-center mt-2">
                    Did not receive a code?{' '}
                    <span
                        className={`text-blue-800 cursor-pointer ${isResending || timer > 0 ? 'pointer-events-none' : ''}`}
                        onClick={handleResend}
                    >
                        {timer > 0 ? `Send again in ${timer}s` : 'Send again'}
                    </span>
                </h2>
            </div>
            <div className="form-group w-full m-auto mt-6 text-center">
                <button
                    type="submit"
                    onClick={handleVerify}
                    className="py-2 px-6 bg-black text-white rounded-md mx-4 hover:bg-slate-400 duration-200"
                >
                    Verify Now
                </button>
            </div>
        </div>
    );
}
