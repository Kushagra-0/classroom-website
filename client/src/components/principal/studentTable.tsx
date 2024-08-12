import { useEffect, useState } from 'react';
import axios from 'axios';
import Student from '../../types/student';
import AddStudent from './addStudent';

const StudentTable = () => {
    const [students, setStudents] = useState<Student[]>([]);

    const fetchStudents = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/principal/students', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudents(res.data);
        } catch (err) {
            console.error('Failed to fetch students', err);
        }
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/principal/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchStudents(); // Refresh the list
        } catch (err) {
            console.error('Failed to delete student', err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Students</h1>
            <AddStudent onAdd={fetchStudents} />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-300">Name</th>
                            <th className="px-4 py-2 border-b border-gray-300">Email</th>
                            <th className="px-4 py-2 border-b border-gray-300">Class</th>
                            <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b border-gray-300">{student.name}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{student.email}</td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {student.classroomId?.name || 'No Classroom Assigned'}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(student._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;
