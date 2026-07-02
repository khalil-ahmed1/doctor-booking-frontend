import API from "../api/axios";

export const getDoctorDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/doctors/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
