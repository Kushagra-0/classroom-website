import { useEffect, useState } from 'react';
import axios from 'axios';
import Student from '../../types/student';


const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [classroomId, setClassroomId] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve classroomId from localStorage
        const classroomIdFromStorage = localStorage.getItem('classroomId');
        setClassroomId(classroomIdFromStorage);

        const fetchStudents = async () => {
            const token = localStorage.getItem('token');
            if (classroomIdFromStorage) {
                try {
                    console.log(`Fetching students for classroomId: ${classroomIdFromStorage}`);
                    const res = await axios.get(`http://localhost:5000/api/student/classroom/${classroomIdFromStorage}/students`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log('Fetched students:', res.data);
                    setStudents(res.data);
                } catch (err) {
                    console.error('Failed to fetch students', err);
                }
            } else {
                console.log('No classroomId found in localStorage');
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h2>Students in Your Classroom</h2>
            {students.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students found in your classroom.</p>
            )}
        </div>
    );
};

export default StudentList;
