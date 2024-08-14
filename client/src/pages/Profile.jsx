import { useEffect, useState } from "react";
import Verification from "../asset/images/verify.png";
import Navbar from "../compoents/Navbar";
import axios from "axios";
import Loader from "../compoents/Loader";
import Cookies from 'js-cookie';
const Profile = () => {
    const [data, setData] = useState('')
    const [loader, setLoader] = useState(false)
    const getData = () => {
        setLoader(true)
        axios.get(`${process.env.REACT_APP_HOST_SERVER}user/get/students`).then((res) => {
            setLoader(false)
            setData(res.data)
        }).catch((err) => {
            setLoader(false)
            console.log(err)
        })
    }
    useEffect(() => {
        getData()
    }, [])
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
                                <img src={Verification} alt="" className="w-32 h-32 rounded-full m-auto border-yellow-600 p-1 border-2" />
                            </div>
                            <div className="profile-info md:w-[60%]">
                                <div className="inputs flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="form-group mt-4">
                                        <label className="md:text-xl">User Name</label> <br />
                                        <input
                                            type="text"
                                            disabled
                                            value={data[0].name}
                                            className="w-[250px] md:w-[340px] py-3 px-4 mt-2 bg-gray-200"
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className="md:text-xl">Email</label> <br />
                                        <input
                                            type="text"
                                            disabled
                                            value={data[0].email}
                                            className="w-[250px] md:w-[340px] py-3 px-4 mt-2 bg-gray-200"
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label className="md:text-xl">Birth Date</label> <br />
                                        <input
                                            type="text"
                                            disabled
                                            value={data[0].birthDate.slice(0,-14)}
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