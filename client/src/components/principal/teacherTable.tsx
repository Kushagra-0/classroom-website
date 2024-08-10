import { useEffect, useState } from 'react';
import axios from 'axios';
import Teacher from '../../types/teacher';
import AddTeacher from './addTeacher';

const TeacherTable = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

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

    const handleEdit = (teacher: Teacher) => {
        setEditingTeacher(teacher);
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div>
            <h2>Teachers</h2>
            <AddTeacher onAdd={fetchTeachers} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>
                                <button onClick={() => handleEdit(teacher)}>Edit</button>
                                <button onClick={() => handleDelete(teacher._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherTable;
