import { useState } from 'react';
import axios from 'axios';
import EditTeacherProps from '../../types/editTeacherProps';

const EditTeacher: React.FC<EditTeacherProps> = ({ teacher, onSave, onCancel }) => {
    const [name, setName] = useState(teacher.name);
    const [email, setEmail] = useState(teacher.email);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `http://localhost:5000/api/principal/user/${teacher._id}`,
                { name, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSave(); // Refresh the list
            onCancel(); // Close the edit form
        } catch (err) {
            console.error('Failed to update teacher', err);
        }
    };

    return (
        <div>
            <h2>Edit Teacher</h2>
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

export default EditTeacher;
