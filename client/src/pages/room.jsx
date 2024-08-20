import { useEffect, useState } from "react";
import Navbar from "../compoents/Navbar";
import { FaFileUpload, FaCommentAlt, FaBookOpen, FaBell, FaUser, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Room = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState('');
    const [room, setRoom] = useState(null);
    const { code } = useParams()
    const navigate = useNavigate('');
    const [role, setRole] = useState('');
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
                navigate('/signin');
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/student`, { refreshToken });
            if (response.data.message === "User found!") {
                setData(response.data.user);
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            sessionStorage.removeItem('refreshToken');
            navigate('/signin');
        }
    };

    const handleGetClassroom = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/room`, { roomCode: code });
            setRoom(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchStudentData();
        fetchTeacherData();
        handleGetClassroom();
    }, []);

    const [comments, setComments] = useState([]);
    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Assignment 1: Algebra', dueDate: '2024-08-20', description: 'Solve the provided algebra problems.' },
        { id: 2, title: 'Assignment 2: Calculus', dueDate: '2024-08-25', description: 'Complete the calculus worksheet.' },
        { id: 3, title: 'Assignment 3: Geometry', dueDate: '2024-09-01', description: 'Prepare a presentation on basic geometric shapes.' },
        { id: 4, title: 'Assignment 4: Statistics', dueDate: '2024-09-10', description: 'Analyze the given data set.' }
    ]);
    const [resources, setResources] = useState([
        { id: 1, name: 'Chapter 1: Introduction to Algebra', type: 'PDF' },
        { id: 2, name: 'Lecture Notes: Calculus Basics', type: 'PDF' },
        { id: 3, name: 'Video Lecture: Geometry Concepts', type: 'Video' },
        { id: 4, name: 'Statistics Study Guide', type: 'PDF' }
    ]);
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Brown' },
        { id: 4, name: 'Emily White' },
    ]);
    const [currentComment, setCurrentComment] = useState('');

    const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', description: '' });
    const [newResource, setNewResource] = useState({ name: '', type: '' });

    const handleAddAssignment = () => {
        const newId = assignments.length + 1;
        setAssignments([...assignments, { id: newId, ...newAssignment }]);
        setNewAssignment({ title: '', dueDate: '', description: '' });
    };

    const handleAddResource = () => {
        const newId = resources.length + 1;
        setResources([...resources, { id: newId, ...newResource }]);
        setNewResource({ name: '', type: '' });
    };

    const handleCommentSubmit = () => {
        setComments([...comments, { text: currentComment }]);
        setCurrentComment('');
    };

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
                                    {assignments.map((assignment) => (
                                        <div key={assignment.id} className="min-w-[250px] bg-gray-50 p-4 rounded-lg shadow-md">
                                            <h3 className="text-xl font-bold">{assignment.title}</h3>
                                            <p className="text-gray-600">{assignment.description}</p>
                                            <p className="text-sm text-gray-500 mt-2">Due: {assignment.dueDate}</p>
                                        </div>
                                    ))}
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
                                <div key={resource.id} className="mb-4 bg-gray-50 p-4 rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold">{resource.name}</h3>
                                    <p className="text-sm text-gray-500">{resource.type}</p>
                                </div>
                            ))}
                        </div>

                        {
                            (role == 'teacher') ? <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
                                <h2 className="text-xl font-semibold text-lime-500 mb-4">
                                    <FaPlus className="inline-block mr-2" /> Add New Resource
                                </h2>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        className="w-full py-2 px-4 rounded-lg shadow-md bg-gray-200 text-gray-900 focus:outline-none"
                                        placeholder="Resource Name"
                                        value={newResource.name}
                                        onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="w-full py-2 px-4 rounded-lg shadow-md bg-gray-200 text-gray-900 focus:outline-none"
                                        placeholder="Resource Type (e.g., PDF, Video)"
                                        value={newResource.type}
                                        onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                                    />
                                    <button
                                        className="w-full py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-all"
                                        onClick={handleAddResource}
                                    >
                                        Add Resource
                                    </button>
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
                            room && room.students && room.students.map((student,index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                                    <p className="text-lg font-bold text-gray-900">{student}</p>
                                    <p className="text-lg font-bold text-gray-900">sss</p>
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
                            value={currentComment}
                            onChange={(e) => setCurrentComment(e.target.value)}
                        />
                        <button
                            className="px-6 py-3 bg-lime-500 text-white rounded-r-lg hover:bg-lime-600 transition-all"
                            onClick={handleCommentSubmit}
                        >
                            Submit
                        </button>
                    </div>
                    <div>
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg shadow">
                                <p className="text-gray-900">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
