import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getDoctors, suspendDoctor } from "../../services/adminService";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const result = await getDoctors();
      setDoctors(result.doctors);
    } catch (error) {
      toast.error("Unable to load doctors");
    }
  };

  const handleSuspend = async (doctorId) => {
    try {
      const result = await suspendDoctor(doctorId);

      toast.success(result.message);

      loadDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Doctor Management</h1>

        <Link
          to="/admin/add-doctor"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Add Doctor
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Specialization</th>
              <th className="p-4 text-left">Clinic</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No doctors found
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{doctor.name}</td>

                  <td className="p-4">{doctor.specialization}</td>

                  <td className="p-4">{doctor.clinicName}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        doctor.subscriptionStatus === "active"
                          ? "bg-green-100 text-green-700"
                          : doctor.subscriptionStatus === "suspended"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {doctor.subscriptionStatus}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleSuspend(doctor._id)}
                      className={`text-white px-4 py-2 rounded-lg transition ${
                        doctor.subscriptionStatus === "suspended"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {doctor.subscriptionStatus === "suspended"
                        ? "Activate"
                        : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDoctors;
