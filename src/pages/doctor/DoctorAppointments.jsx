import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";

import {
  getMyDoctorAppointments,
  markAppointmentChecked,
} from "../../services/doctorAppointmentService";

const DoctorAppointments = () => {
    const handleCheck = async (appointmentId) => {
      try {
        await markAppointmentChecked(appointmentId);

        toast.success("Patient marked as checked");

        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === appointmentId
              ? {
                  ...appointment,
                  status: "checked",
                }
              : appointment,
          ),
        );
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message || "Failed to update appointment",
        );
      }
    };
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await getMyDoctorAppointments();

        setAppointments(result.appointments);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load appointments");
      }
    };

    fetchAppointments();
  }, []);

  return (
    <DoctorLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">My Appointments</h1>

       {appointments.length === 0 ? (
  <p className="text-gray-500">No appointments found.</p>
) : (
  <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

    <table className="w-full">

      <thead className="bg-blue-600 text-white">

        <tr>

          <th className="p-4 text-left">Token</th>

          <th className="p-4 text-left">Patient</th>

          <th className="p-4 text-left">Mobile</th>

          <th className="p-4 text-left">Type</th>

          <th className="p-4 text-left">Status</th>

          <th className="p-4 text-left">Date</th>

          <th className="p-4 text-center">Action</th>

        </tr>

      </thead>

      <tbody>

        {appointments.map((appointment) => (

          <tr
            key={appointment._id}
            className="border-b hover:bg-gray-50"
          >

            <td className="p-4 font-bold">
              {appointment.tokenNumber || "-"}
            </td>

            <td className="p-4">

              <div className="font-semibold">
                {appointment.patientId.name}
              </div>

            </td>

            <td className="p-4">
              {appointment.patientId.mobile}
            </td>

            <td className="p-4 capitalize">
              {appointment.appointmentType}
            </td>

            <td className="p-4">

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  appointment.status === "checked"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appointment.status}
              </span>

            </td>

            <td className="p-4">

              {new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}

            </td>

            <td className="p-4 text-center">

              {appointment.status !== "checked" ? (

                <button
                  onClick={() =>
                    handleCheck(appointment._id)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  ✓ Check
                </button>

              ) : (

                <span className="text-green-600 font-bold">
                  ✔ Done
                </span>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
)}
    
      </div>
    </DoctorLayout>
  );
};

export default DoctorAppointments;
