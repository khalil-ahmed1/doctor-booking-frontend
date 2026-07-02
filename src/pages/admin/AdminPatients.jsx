import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getPatients } from "../../services/adminService";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const result = await getPatients();

      setPatients(result.patients);
    } catch (error) {
      toast.error("Unable to load patients");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">
        Patient Management
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No patients found
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{patient.name}</td>

                  <td className="p-4">{patient.email}</td>

                  <td className="p-4">{patient.mobile}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPatients;
