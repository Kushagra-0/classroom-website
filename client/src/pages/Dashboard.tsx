import PrincipalDashboard from "./PrincipalDashboard"
import StudentDashboard from "./StudentDashboard"
import TeacherDashboard from "./TeacherDashboard"

const Dashboard = () => {
  const role = localStorage.getItem('role');

  if (role === 'Principal') {
    return <PrincipalDashboard />;
  } else if (role === 'Teacher') {
      return <TeacherDashboard />;
  } else if (role === 'Student') {
      return <StudentDashboard />;
  } else {
      return <div>No dashboard available for this role</div>;
  }
}

export default Dashboard