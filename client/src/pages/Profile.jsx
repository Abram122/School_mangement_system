import { useEffect, useState } from "react";
import Navbar from "../compoents/Navbar";
import axios from "axios";
import Loader from "../compoents/Loader";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState('')
    const navigate = useNavigate('')
    const fetchStudentData = async () => {
        try {
            setLoader(true)
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (!refreshToken) {
                navigate('/signin')
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/student`, { refreshToken });
            if (response.data.message === "User found!") {
                setData(response.data.user);
                setLoader(false)
            } 
        } catch (err) {
            setLoader(false)
            sessionStorage.removeItem('refreshToken')
            navigate('/signin')
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    return (
        <div className="py-3">
            <Navbar />
            {
                loader ? <Loader text="Getting data..." /> :
                    data &&
                    <div className="profile w-[90%] mt-20 m-auto shadow-lg">
                            <div className="header bg-lime-500 text-white text-center py-4 w-full m-auto">
                            <h1 className="text-xl md:text-2xl text-center">My Profile</h1>
                        </div>
                        <div className="md:flex flex-wrap gap-4 items-center py-3">
                            <div className="profile-img md:w-[33%] text-center">
                                    <img src={`${process.env.REACT_APP_HOST_SERVER}images/${data.profileImage}`} alt="" className="w-32 h-32 rounded-full m-auto border-yellow-600 p-1 border-2" />
                            </div>
                            <div className="profile-info md:w-[60%]">
                                <div className="inputs flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="form-group mt-4">
                                        <label className="md:text-xl">User Name</label> <br />
                                        <input
                                            type="text"
                                            disabled
                                            value={data.name}
                                            className="w-[250px] md:w-[340px] py-3 px-4 mt-2 bg-gray-200"
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className="md:text-xl">Email</label> <br />
                                        <input
                                            type="text"
                                            disabled
                                            value={data.email}
                                            className="w-[250px] md:w-[340px] py-3 px-4 mt-2 bg-gray-200"
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className="md:text-xl">Birth Date</label> <br />
                                        <input
                                            type="text"
                                            disabled
                                            value={data.birthDate.slice(0,-14)}
                                            className="w-[250px] md:w-[340px] py-3 px-4 mt-2 bg-gray-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Profile;