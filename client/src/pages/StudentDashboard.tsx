import StudentList from "../components/students/studentList";

const StudentDashboard = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-6 text-center">
                Student Dashboard
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <StudentList />
            </div>
        </div>
    );
};

export default StudentDashboard;
