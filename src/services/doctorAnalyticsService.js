import API from "../api/axios";

export const getDoctorAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/doctors/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
