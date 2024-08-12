import { useEffect, useState } from 'react';
import axios from 'axios';
import Student from '../../types/student';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';


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
            <Typography variant="h4" gutterBottom>
                Students in Your Classroom
            </Typography>
            {students.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body1">No students found in your classroom.</Typography>
            )}
        </div>
    );
};

export default StudentList;
