import { useState } from 'react';
import axios from 'axios';
import AddTeacherProps from '../../types/addTeacherProps';

const AddTeacher: React.FC<AddTeacherProps> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAddTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(
                'http://localhost:5000/api/principal/create-teacher',
                { name, email, password },
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
                <button type="submit">Add Teacher</button>
            </form>
        </div>
    );
};

export default AddTeacher;
