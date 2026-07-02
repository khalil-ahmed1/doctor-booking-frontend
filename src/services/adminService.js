import API from "../api/axios";

const getToken = () => localStorage.getItem("token");

export const getDashboard = async () => {
  const response = await API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getDoctors = async () => {
  const response = await API.get("/admin/doctors", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getPatients = async () => {
  const response = await API.get("/admin/patients", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const suspendDoctor = async (doctorId) => {
  const response = await API.put(
    `/admin/suspend/${doctorId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

export const approveDoctor = async (doctorId) => {
  const response = await API.put(
    `/admin/approve/${doctorId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};
export const searchDoctors = async (search) => {
  const response = await API.get(`/admin/doctors/search?search=${search}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
export const createDoctor = async (doctorData) => {
  const response = await API.post("/admin/create-doctor", doctorData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};