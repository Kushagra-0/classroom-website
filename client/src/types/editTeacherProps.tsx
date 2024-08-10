import Teacher from "./teacher";

interface EditTeacherProps {
    teacher: Teacher;
    onSave: () => void;
    onCancel: () => void;
}

export default EditTeacherProps