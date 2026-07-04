import API from "../api/axios";

const getToken = () => localStorage.getItem("token");

// Normal Appointment
export const bookNormalAppointment = async (doctorId) => {
  const response = await API.post(
    "/appointments/normal",
    { doctorId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

// Premium Appointment
export const bookPremiumAppointment = async (doctorId, slotDate, slotTime) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/appointments/premium",
    {
      doctorId,
      slotDate,
      slotTime,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// Home Visit Appointment

 export const bookHomeVisitAppointment = async (
  doctorId,
  visitDate,
  slotTime,
  address,
  landmark,
  city,
  pincode,
) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/appointments/home",
    {
      doctorId,
      visitDate,
      slotTime,
      homeVisitAddress: address,
      homeVisitLandmark: landmark,
      homeVisitCity: city,
      homeVisitPincode: pincode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// Global Cancel Appointment
export const cancelAppointmentGlobal = async (appointmentId, reason) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/appointments/${appointmentId}/cancel`,
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};