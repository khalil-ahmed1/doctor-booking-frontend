import API from "../api/axios";

export const createOrder = async (appointmentId) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/payment/create-order",
    { appointmentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/payment/verify", paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
