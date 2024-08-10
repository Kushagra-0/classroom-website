import AssignTeacher from "../components/principal/assignTeacher";
import CreateClassroom from "../components/principal/createClassroom";
import StudentTable from "../components/principal/studentTable";
import TeacherTable from "../components/principal/teacherTable";

const PrincipalDashboard = () => {
    return (
        <div>
            <h1>Principal Dashboard</h1>
            <CreateClassroom />
            <AssignTeacher />
            <TeacherTable />
            <StudentTable />
        </div>
    );
};

export default PrincipalDashboard;
