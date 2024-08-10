import { useState } from 'react';
import axios from 'axios';

const CreateClassroom = () => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState<string[]>([]);

    const handleCreateClassroom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(
                'http://localhost:5000/api/principal/classroom',
                { name, startTime, endTime, days },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Classroom created', res.data);
        } catch (err) {
            console.error('Failed to create classroom', err);
        }
    };

    return (
        <div>
            <h2>Create Classroom</h2>
            <form onSubmit={handleCreateClassroom}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div>
                    <label>Days:</label>
                    <input type="text" value={days} onChange={(e) => setDays(e.target.value.split(','))} required />
                </div>
                <button type="submit">Create Classroom</button>
            </form>
        </div>
    );
};

export default CreateClassroom;
