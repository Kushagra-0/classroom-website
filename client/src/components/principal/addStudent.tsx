import { useState } from 'react';
import axios from 'axios';
import AddStudentProps from '../../types/addStudentProps';

const AddStudent: React.FC<AddStudentProps> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(
                'http://localhost:5000/api/principal/create-student',
                { name, email, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Student created', res.data);
            onAdd(); // Refresh the student list
        } catch (err) {
            console.error('Failed to create student', err);
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleAddStudent}>
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
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
