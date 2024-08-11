import { useState, useEffect } from 'react';
import axios from 'axios';
import Classroom from '../../types/classroom';

const AddTeacher = ({ onAdd }: { onAdd: () => void }) => {
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

    const handleAddTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(
                'http://localhost:5000/api/principal/create-teacher',
                { name, email, password, classroomId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Teacher created', res.data);
            onAdd(); // Refresh the teacher list
        } catch (err) {
            console.error('Failed to create teacher', err);
        }
    };

    return (
        <div>
            <h2>Add Teacher</h2>
            <form onSubmit={handleAddTeacher}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Classroom:</label>
                    <select value={classroomId} onChange={(e) => setClassroomId(e.target.value)} required>
                    <option value="">Select a classroom</option>
                        {classrooms.map((classroom) => (
                            <option key={classroom._id} value={classroom._id}>
                                {classroom.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Teacher</button>
            </form>
        </div>
    );
};

export default AddTeacher;
