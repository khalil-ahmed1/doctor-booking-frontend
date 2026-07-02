import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDashboard } from "../../services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
   const fetchDashboard = async () => {
     try {
       const result = await getDashboard();

       console.log(result);

       setStats(result.statistics);
     } catch (error) {
       console.log(error);
       toast.error("Failed to load dashboard");
     }
   };

    fetchDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="text-center py-20 text-2xl">Loading Dashboard...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Doctors</h2>
          <p className="text-3xl font-bold">{stats.totalDoctors}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Patients</h2>
          <p className="text-3xl font-bold">{stats.totalPatients}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Appointments</h2>
          <p className="text-3xl font-bold">{stats.totalAppointments}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Active Doctors</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.activeDoctors}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Pending Doctors</h2>
          <p className="text-3xl font-bold text-orange-600">
            {stats.pendingDoctors}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold text-blue-600">
            ₹{stats.totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
