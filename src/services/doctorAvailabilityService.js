import API from "../api/axios";

export const updateAvailability = async (availabilityData) => {
  const token = localStorage.getItem("token");

  const response = await API.put("/doctors/availability", availabilityData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getAvailability = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/doctors/availability", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};