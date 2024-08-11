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
        <div>
            <h2>Students</h2>
            <AddStudent onAdd={fetchStudents} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.classroomId?.name || 'No Classroom Assigned'}</td>
                            <td>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
