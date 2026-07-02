import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>

          <nav className="space-y-4">
            <Link to="/admin/dashboard" className="block hover:text-yellow-300">
              Dashboard
            </Link>

            <Link to="/admin/doctors" className="block hover:text-yellow-300">
              Doctors
            </Link>
            <Link
              to="/admin/add-doctor"
              className="block hover:text-yellow-300"
            >
              Add Doctor
            </Link>

            <Link to="/admin/patients" className="block hover:text-yellow-300">
              Patients
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
