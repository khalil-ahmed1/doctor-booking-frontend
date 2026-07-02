import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getAppointmentTicket,
  downloadTicket as downloadTicketAPI,
} from "../../services/ticketService";

const AppointmentTicket = () => {
  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const result = await getAppointmentTicket(id);

        setAppointment(result.appointment);
      } catch (error) {
        toast.error("Unable to load ticket");
      }
    };

    fetchTicket();
  }, [id]);

  if (!appointment)
    return <div className="text-center py-20 text-2xl">Loading Ticket...</div>;
const downloadTicket = async () => {
  try {
    const pdfBlob = await downloadTicketAPI(appointment._id);

    const url = window.URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `Ticket-${appointment.bookingReference}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("Unable to download ticket");
    console.error(error);
  }
};
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div id="ticket" className="bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center text-blue-700">
          SehatRaj
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          {appointment.appointmentType === "premium"
            ? "⭐ Premium Appointment Ticket"
            : appointment.appointmentType === "home"
              ? "🏠 Home Visit Ticket"
              : "🩺 Appointment Ticket"}
        </p>

        <hr className="mb-8" />

        <p>
          <strong>Booking Reference:</strong> {appointment.bookingReference}
        </p>

        <p>
          <strong>Doctor:</strong> {appointment.doctorId.name}
        </p>

        <p>
          <strong>Specialization:</strong> {appointment.doctorId.specialization}
        </p>

        <p>
          <strong>Patient:</strong> {appointment.patientId.name}
        </p>

        <p>
          <p>
            <strong>Appointment Type:</strong>{" "}
            {appointment.appointmentType === "normal"
              ? "🩺 Normal Consultation"
              : appointment.appointmentType === "premium"
                ? "⭐ Premium Consultation"
                : "🏠 Home Visit"}
          </p>
        </p>

        {appointment.appointmentType === "normal" ? (
          <>
            <p>
              <strong>Token Number:</strong> {appointment.tokenNumber}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(appointment.appointmentDate).toLocaleDateString()}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Appointment Date:</strong>{" "}
              {new Date(appointment.slotDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Appointment Time:</strong> {appointment.slotTime}
            </p>
          </>
        )}
        <p>
          <strong>Clinic:</strong> {appointment.doctorId.clinicName}
        </p>

        <p>
          <strong>Address:</strong> {appointment.doctorId.clinicAddress}
        </p>

        <p>
          <strong>Amount Paid:</strong> ₹{appointment.amountPaid}
        </p>

        <p>
          <strong>Payment:</strong> {appointment.paymentStatus}
        </p>

        <p>
          <strong>Status:</strong> {appointment.status}
        </p>
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-bold text-blue-700 mb-3">
            Patient Instructions
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Please arrive at least <strong>15 minutes before</strong> your
              scheduled appointment.
            </li>

            <li>Carry this appointment ticket during your visit.</li>

            <li>
              Bring previous prescriptions and medical reports if available.
            </li>

            <li>Please follow the doctor's and clinic staff's instructions.</li>
          </ul>

          <div className="mt-6 border-t pt-4 text-center text-gray-600">
            <p className="font-semibold">Need Help?</p>

            <p>📞 +91-9149852051</p>

            <p>📧 ka8932007@gmail.com</p>

            <p>🌐 www.sehatraj.com</p>

            <p className="mt-4 text-sm">
              Powered by <strong>SehatRaj</strong>
              <br />A Product of <strong>Qurenix Technologies Pvt. Ltd.</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={downloadTicket}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Download PDF
        </button>

        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-black"
        >
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default AppointmentTicket;
