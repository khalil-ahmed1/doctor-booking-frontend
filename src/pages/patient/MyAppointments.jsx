import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  getMyAppointments,
  cancelAppointment,
} from "../../services/patientService";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await getMyAppointments();

        setAppointments(result.appointments);
      } catch (error) {
        toast.error("Failed to load appointments");
      }
    };

    fetchAppointments();
  }, 
  
  []);
  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);

      toast.success("Appointment Cancelled");

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? {
                ...appointment,
                status: "cancelled_by_patient",
              }
            : appointment,
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancellation Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-2xl shadow-lg p-6 mb-5"
          >
            <h2 className="text-xl font-bold">{appointment.doctorId.name}</h2>

            <p>{appointment.doctorId.specialization}</p>

            <p>Token No : {appointment.tokenNumber}</p>

            <p>Status : {appointment.status}</p>

            <p>Type : {appointment.appointmentType}</p>

            <p>
              Date :{" "}
              {new Date(appointment.appointmentDate).toLocaleDateString()}
            </p>

            {appointment.status !== "cancelled_by_patient" && (
              <button
                onClick={() => handleCancel(appointment._id)}
                className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Cancel Appointment
              </button>
            )}
            <Link
              to={`/ticket/${appointment._id}`}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              View Ticket
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;
