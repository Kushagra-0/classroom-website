import { useState, useEffect } from 'react';
import axios from 'axios';
import Classroom from '../../types/classroom';
import Teacher from '../../types/teacher';

const AssignTeacher = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<string>('');
    const [selectedClassroom, setSelectedClassroom] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const teachersRes = await axios.get('http://localhost:5000/api/principal/teachers', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const classroomsRes = await axios.get('http://localhost:5000/api/classrooms', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeachers(teachersRes.data);
                setClassrooms(classroomsRes.data);
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };

        fetchData();
    }, []);

    const handleAssignTeacher = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/principal/assign-teacher',
                { teacherId: selectedTeacher, classroomId: selectedClassroom },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Teacher assigned');
        } catch (err) {
            console.error('Failed to assign teacher', err);
        }
    };

    return (
        <div>
            <h2>Assign Teacher to Classroom</h2>
            <form onSubmit={handleAssignTeacher}>
                <div>
                    <label>Select Teacher:</label>
                    <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                        <option value="">Select a teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Classroom:</label>
                    <select value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
                        <option value="">Select a classroom</option>
                        {classrooms.map((classroom) => (
                            <option key={classroom._id} value={classroom._id}>
                                {classroom.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Assign Teacher</button>
            </form>
        </div>
    );
};

export default AssignTeacher;
