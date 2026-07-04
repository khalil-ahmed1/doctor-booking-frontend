import API from "../api/axios";

// Get all doctors (for homepage)
export const getDoctors = async () => {
  const response = await API.get("/doctors");
  return response.data;
};

// Search doctors
export const searchDoctors = async (keyword = "") => {
  const response = await API.get("/doctors/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

// Get single doctor
export const getDoctorById = async (id) => {
  const response = await API.get(`/doctors/${id}`);
  return response.data;
};

export const getPremiumSlots = async (doctorId, date) => {
  const response = await API.get(`/doctors/${doctorId}/premium-slots`, {
    params: {
      date,
    },
  });

  return response.data;
};

export const getHomeVisitSlots = async (doctorId, date) => {
  const response = await API.get(
    `/doctors/${doctorId}/home-slots?date=${date}`,
  );

  return response.data;
};

export const updatePremiumSchedule = async (doctorId, scheduleData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`/doctors/${doctorId}/premium-schedule`, scheduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};