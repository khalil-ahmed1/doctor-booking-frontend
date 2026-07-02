import API from "../api/axios";

export const getDoctorEarnings = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/doctors/earnings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
