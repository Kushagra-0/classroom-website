import { useState } from 'react';
import axios from 'axios';
import EditStudentProps from '../../types/editStudentProps';

const EditStudent: React.FC<EditStudentProps> = ({ student, onSave, onCancel }) => {
    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `http://localhost:5000/api/principal/user/${student._id}`,
                { name, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSave(); // Refresh the list
            onCancel(); // Close the edit form
        } catch (err) {
            console.error('Failed to update student', err);
        }
    };

    return (
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleSave}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditStudent;
