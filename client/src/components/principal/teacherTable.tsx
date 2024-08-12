import { useEffect, useState } from 'react';
import axios from 'axios';
import Teacher from '../../types/teacher';
import AddTeacher from './addTeacher';

const TeacherTable = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const fetchTeachers = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/principal/teachers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeachers(res.data);
        } catch (err) {
            console.error('Failed to fetch teachers', err);
        }
    };

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/principal/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTeachers(); // Refresh the list
        } catch (err) {
            console.error('Failed to delete teacher', err);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Teachers</h1>
            <AddTeacher onAdd={fetchTeachers} />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700">Name</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700">Email</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700">Class</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-left text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b border-gray-300">{teacher.name}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{teacher.email}</td>
                                <td className="px-4 py-2 border-b border-gray-300">
                                    {teacher.classroomId?.name || 'No Classroom Assigned'}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-300 flex space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(teacher._id)}
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

export default TeacherTable;
