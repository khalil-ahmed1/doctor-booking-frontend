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
export const searchDoctors = async (keyword) => {
  const response = await API.get(`/admin/doctors/search?keyword=${keyword}`, {
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

export const getPendingDoctors = async () => {
  const response = await API.get("/admin/pending-doctors", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const activateSubscription = async (activationData) => {
  const response = await API.post("/admin/activate-subscription", activationData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getRevenueReport = async () => {
  const response = await API.get("/admin/revenue-report", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const approveRefund = async (refundId) => {
  const response = await API.put(`/admin/refund/${refundId}`, {}, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};