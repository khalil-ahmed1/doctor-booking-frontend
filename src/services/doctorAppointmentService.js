import API from "../api/axios";

export const getMyDoctorAppointments = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/doctors/my-appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const markAppointmentChecked = async (appointmentId) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/appointments/${appointmentId}/check`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};