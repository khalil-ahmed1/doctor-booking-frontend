import API from "../api/axios";

export const getMyAppointments = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/patients/appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const cancelAppointment = async (appointmentId) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/patients/appointment/${appointmentId}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};