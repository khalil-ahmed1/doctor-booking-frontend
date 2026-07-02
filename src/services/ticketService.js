import API from "../api/axios";

export const getAppointmentTicket = async (appointmentId) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/appointments/ticket/${appointmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const downloadTicket = async (appointmentId) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/tickets/download/${appointmentId}`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};