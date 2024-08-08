import { Link } from "react-router-dom";
import Navbar from "../compoents/Navbar";

const Page404 = () => {
    return (
        <div>
            <Navbar />
            <div className="body h-[100vh] flex flex-col justify-center items-center bg-black text-white">
                <h1 className="text-9xl">OOPS</h1>
                <h1 className="text-4xl mt-4 text-blue-800"><Link to={'/'}>[Go Back]</Link></h1>
            </div>
        </div>
    );
}
export default Page404;