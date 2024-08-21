import { useEffect, useState } from "react";
import Navbar from "../compoents/Navbar";
import { FaFileUpload, FaCommentAlt, FaBookOpen, FaBell, FaUser, FaPlus , FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const Room = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState('');
    const [room, setRoom] = useState(null);
    const [student, setStudent] = useState(null);
    const { code } = useParams();
    const [role, setRole] = useState('');
    const [comments, setComments] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [assignment, setAssignment] = useState([]);
    const [resources, setResources] = useState([]);
    const [students, setStudents] = useState([]);
    const [comment, setComment] = useState('');
    const [response, setresponse] = useState('');
    const [responses, setresponses] = useState('');
    const [name, setName] = useState('');
    const [materialName, setMaterialName] = useState('')
    const [file, setFile] = useState(null);
    const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', description: '' });
    const [newResource, setNewResource] = useState({ name: '', type: '' });
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const navigate = useNavigate();
    const fetchTeacherData = async () => {
        try {
            const refreshToken = sessionStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/teacher/verify`, { refreshToken });
            if (response.data.message === "Teacher found!") {
                setRole('teacher');
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const fetchStudentData = async () => {
        try {
            setLoader(true);
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (!refreshToken) {
                if (!role) {
                    navigate('/signin');
                }
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/student`, { refreshToken });
            if (response.data.message === "User found!") {
                setData(response.data.user);
                setName(response.data.user.name)
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            if (!role) {
                sessionStorage.removeItem('refreshToken');
                navigate('/signin');
            }
        }
    };

    const handleGetClassroom = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/room`, { roomCode: code });
            setRoom(response.data);
            setStudent(response.data[0].students);
            setComments(response.data[0].comments);
            setResources(response.data[0].materials);
            const today = new Date().toISOString().slice(0, 10);

            const filteredAssignments = response.data[0].assignments.filter(
                assignment => assignment.dueDate.slice(0, 10) >= today
            );

            setAssignment(filteredAssignments);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddAssignment = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/add/assignment/${room[0]._id}`, newAssignment);
            console.log(response);

            if (response.status === 200) {
                setAssignments([...assignments, response.data.assignment]);
                setNewAssignment({ title: '', dueDate: '', description: '' });
                handleGetClassroom();

                Swal.fire({
                    title: 'Assignment Added!',
                    text: 'The assignment has been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error("Error adding assignment:", error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to add the assignment. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleAddMaterial = async (e) => {
        e.preventDefault();

        if (!materialName) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a name for the material.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (!file) {
            Swal.fire({
                title: 'Error!',
                text: 'Please upload a file.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = new FormData();
        formData.append('name', materialName);
        formData.append('material', file);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_SERVER}admin/add/material/${room[0]._id}`,
                    formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Material added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    handleGetClassroom(); 
                    setMaterialName('');
                    setFile(null);
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add the material. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleAddComment = async () => {
        try {
            const author = name || 'teacher'
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/add/comment/${room[0]._id}`, { text: comment, author});

            if (response.status === 200) {
                setComment('')
                handleGetClassroom();

                Swal.fire({
                    title: 'Comment Added!',
                    text: 'The Comment has been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error("Error adding Comment:", error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to add the Comment. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleAddResponse = async (commentId) => {
        try {
            const author  = name || 'teacher'
            const res = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/add/response/${room[0]._id}`, { text: response, author ,commentId });
            if (res.status === 200) {
                handleGetClassroom();
                Swal.fire({
                    title: 'Response Added!',
                    text: 'The response has been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.reload()
                })
            }
        }
        catch (error) {
            console.error('Error adding response:', error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to add the Response. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };


    useEffect(() => {
        const fetchData = async () => {
            const isTeacher = await fetchTeacherData();
            if (!isTeacher) {
                await fetchStudentData();
            }
            await handleGetClassroom();
        };

        fetchData();
    }, [code]);
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar />
            <div className="container mx-auto py-8 px-4 mt-14">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-bold text-lime-500">Classroom Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-lime-500 mb-4">
                                <FaBell className="inline-block mr-2" /> Announcements
                            </h2>
                            <div className="text-gray-700 mb-4">
                                <p>Welcome to the new semester! Please review the syllabus and complete your first assignments on time.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-lime-500 mb-4">
                                <FaBookOpen className="inline-block mr-2" /> Assignments
                            </h2>
                            <div className="overflow-x-auto custom-scroll-horizontal scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-gray-200">
                                <div className="flex space-x-4">
                                    {
                                        assignment && assignment.map((assignment) => (
                                            <div key={assignment.id} className="min-w-[250px] bg-gray-50 p-4 rounded-lg shadow-md">
                                                <h3 className="text-xl font-bold">{assignment.title}</h3>
                                                <p className="text-gray-600">{assignment.description}</p>
                                                <p className="text-sm text-gray-500 mt-2">Due: {assignment.dueDate.slice(0, 10)}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            (role == 'teacher') ? <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-lime-500 mb-4">
                                    <FaPlus className="inline-block mr-2" /> Add New Assignment
                                </h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full py-2 px-4 rounded-lg shadow-md bg-gray-200 text-gray-900 focus:outline-none"
                                        placeholder="Assignment Title"
                                        value={newAssignment.title}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        className="w-full py-2 px-4 rounded-lg shadow-md bg-gray-200 text-gray-900 focus:outline-none"
                                        value={newAssignment.dueDate}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                    />
                                    <textarea
                                        className="w-full py-2 px-4 rounded-lg shadow-md bg-gray-200 text-gray-900 focus:outline-none"
                                        placeholder="Assignment Description"
                                        value={newAssignment.description}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                                    />
                                    <button
                                        className="w-full py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-all"
                                        onClick={handleAddAssignment}
                                    >
                                        Add Assignment
                                    </button>
                                </div>
                            </div> :''
                        }
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-lime-500 mb-4">
                            <FaFileUpload className="inline-block mr-2" /> Class Resources
                        </h2>
                        <div className="max-h-[400px] overflow-y-auto custom-scroll-vertical scrollbar-thin scrollbar-thumb-lime-500 scrollbar-track-gray-200">
                            {resources.map((resource) => (
                                <div key={resource.id} className="mb-4 bg-gray-50 p-4 rounded-lg shadow-md hover:bg-lime-500 duration-300">
                                    <a href={`http://localhost:5000/uploads/${resource.material}`} className="text-lg font-bold">{resource.name}</a>
                                </div>
                            ))}
                        </div>

                        {
                            (role == 'teacher') ? <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-lime-500 mb-4">
                                    <FaPlus className="inline-block mr-2" /> Add New Resource
                                </h2>
                                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                                    <form onSubmit={handleAddMaterial}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Material Name</label>
                                            <input
                                                type="text"
                                                value={materialName}
                                                onChange={(e) => setMaterialName(e.target.value)}
                                                className="w-full py-2 px-4 rounded-lg shadow-sm bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                                placeholder="Enter material name"
                                                required
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">Upload Material</label>
                                            <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    aria-label="Upload file"
                                                />
                                                <div className="flex flex-col items-center justify-center space-y-2">
                                                    <svg
                                                        className="w-12 h-12 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 8v8m4-4H8m4 12v-6m6 6H6M6 6a6 6 0 0112 0h-2A4 4 0 006 6h2z"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-500">Drag and drop a file here or click to select</span>
                                                    {file && (
                                                        <div className="mt-2 text-gray-700">
                                                            <p className="text-sm">Selected file:</p>
                                                            <p className="text-sm font-semibold truncate">{file.name}</p>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-lime-500 text-white rounded-lg shadow-md hover:bg-lime-600 transition-all focus:outline-none focus:ring-2 focus:ring-lime-500"
                                            >
                                                Add Material
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div> : ''
                        }
                        
                    </div>
                </div>

                <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-lime-500 mb-4">
                        <FaUser className="inline-block mr-2" /> Students in the Classroom
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            student && student.map((student,index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                                    <p className="text-lg font-bold text-gray-900">{student}</p>
                                </div>
                            ))
                        }

                    </div>
                </div>

                <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-lime-500 mb-4">
                        <FaCommentAlt className="inline-block mr-2" /> Class Discussion
                    </h2>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            className="w-full py-3 px-4 rounded-l-lg shadow-md bg-gray-200 text-gray-900 focus:outline-none"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="px-6 py-3 bg-lime-500 text-white rounded-r-lg hover:bg-lime-600 transition-all"
                            onClick={handleAddComment}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="space-y-4">
                        {comments && comments.map((comment,index) => (
                            <div key={comment._id} className="bg-white p-6 mb-4 rounded-lg shadow-lg border border-gray-200">
                                <div className="flex items-start space-x-4 mb-4">
                                    <div className="w-14 h-14 flex items-center justify-center bg-lime-500 text-white text-xl rounded-full shadow-md">
                                        {getInitial(comment.author)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xl font-bold text-gray-900 mb-1">{comment.author}</p>
                                        <p className="text-gray-700 mb-2">{comment.text}</p>
                                        <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                {comment.responses && comment.responses.length > 0 && (
                                    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                                        {comment.responses.map((response, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-white text-lg rounded-full shadow-sm">
                                                    {getInitial(response.author)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-800">{response.author}</p>
                                                    <p className="text-sm text-gray-600">{response.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center mt-4" >
                                    <input
                                        type="text"
                                        className="flex-1 py-2 px-4 rounded-lg shadow-sm bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                        placeholder="Add a response..."
                                        onChange={(e) => setresponse(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleAddResponse(comment._id)}
                                        className="ml-3 px-4 py-2 bg-lime-500 text-white rounded-lg shadow-md hover:bg-lime-600 transition-all focus:outline-none focus:ring-2 focus:ring-lime-500"
                                    >
                                        Respond
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
