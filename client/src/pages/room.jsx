import { useState } from "react";
import Navbar from "../compoents/Navbar";
import { FaFileUpload, FaCommentAlt, FaBookOpen, FaBell } from "react-icons/fa";

const Room = () => {
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
        { id: 3, name: 'Video Lecture: Geometry Concepts', type: 'Video' },
        { id: 4, name: 'Statistics Study Guide', type: 'PDF' }
    ]);
    const [currentComment, setCurrentComment] = useState('');

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
                    {/* Announcements Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-lime-500 mb-4">
                                <FaBell className="inline-block mr-2" /> Announcements
                            </h2>
                            <div className="text-gray-700 mb-4">
                                <p>Welcome to the new semester! Please review the syllabus and complete your first assignments on time.</p>
                            </div>
                        </div>

                        {/* Assignments Section */}
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
                    </div>

                    {/* Resources Section */}
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
                    </div>
                </div>

                {/* Comments Section */}
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
