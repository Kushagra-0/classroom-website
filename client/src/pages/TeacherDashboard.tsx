import StudentTable from "../components/teacher/studentTable";

const TeacherDashboard = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-6 text-center">
                Teacher Dashboard
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <StudentTable />
            </div>
        </div>
    );
};

export default TeacherDashboard;
