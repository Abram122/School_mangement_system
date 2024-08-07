    import Img from "../asset/images/landing.jpg";
    export default function Signup() {
    return (
    <div className="py-3">
        <div className="signup w-[90%] m-auto shadow min-h-[90vh]">
            <div className="header bg-black text-white text-center py-4">
            <img
                src={Img}
                alt="img-form"
                className="w-24 h-24 rounded-full m-auto"
            />
            <h1 className="mt-3 text-2xl">Signup Now</h1>
            </div>
            <div className="body">
            <form className="form py-3">
                <div className="form-group w-[75%] m-auto mt-4">
                <label className="text-xl">User Name</label>
                <input
                    type="text"
                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                />
                </div>
                <div className="form-group w-[75%] m-auto mt-4">
                <label className="text-xl">Email</label>
                <input
                    type="email"
                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                />
                </div>
                <div className="form-group w-[75%] m-auto mt-4">
                <label className="text-xl">Birth Date</label>
                <input
                    type="date"
                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                />
                </div>
                <div className="form-group w-[75%] m-auto mt-4">
                <label className="text-xl">Password</label>
                <input
                    type="password"
                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                />
                </div>
                <div className="form-group w-[75%] m-auto mt-4">
                <label className="text-xl">Confirm Password</label>
                <input
                    type="password"
                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                />
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
