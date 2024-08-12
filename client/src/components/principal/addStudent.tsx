import { useState, useEffect } from 'react';
import axios from 'axios';
import Classroom from '../../types/classroom';

const AddStudent = ({ onAdd }: { onAdd: () => void }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classroomId, setClassroomId] = useState('');
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/principal/classrooms', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClassrooms(res.data);
            } catch (err) {
                console.error('Failed to fetch classrooms', err);
            }
        };

        fetchClassrooms();
    }, []);

    const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(
                'http://localhost:5000/api/principal/create-student',
                { name, email, password, classroomId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Student created', res.data);
            onAdd(); // Refresh the student list
        } catch (err) {
            console.error('Failed to create student', err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Add Student</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Classroom</label>
                    <select
                        value={classroomId}
                        onChange={(e) => setClassroomId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select a classroom</option>
                        {classrooms.map((classroom) => (
                            <option key={classroom._id} value={classroom._id}>
                                {classroom.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
