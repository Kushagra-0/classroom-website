import CreateClassroom from "../components/principal/createClassroom";
import TeacherTable from "../components/principal/teacherTable";
import StudentTable from "../components/principal/studentTable";

const PrincipalDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-6 text-center">
                Principal Dashboard
            </h1>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <CreateClassroom />
                </div>
                <div>
                    <TeacherTable />
                </div>
                <div>
                    <StudentTable />
                </div>
            </div>
        </div>
    );
};

export default PrincipalDashboard;
