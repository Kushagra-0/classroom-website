interface Teacher {
    _id: string;
    name: string;
    email: string;
    classroomId?: {
        _id: string;
        name: string;
    };
}

export default Teacher