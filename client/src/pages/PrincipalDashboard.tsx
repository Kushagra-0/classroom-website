import CreateClassroom from "../components/principal/createClassroom";
import StudentTable from "../components/principal/studentTable";
import TeacherTable from "../components/principal/teacherTable";

const PrincipalDashboard = () => {
    return (
        <div>
            <h1>Principal Dashboard</h1>
            <CreateClassroom />
            <TeacherTable />
            <StudentTable />
        </div>
    );
};

export default PrincipalDashboard;
