import Student from "./student";

interface EditStudentProps {
    student: Student;
    onSave: () => void;
    onCancel: () => void;
}

export default EditStudentProps