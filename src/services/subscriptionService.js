import API from "../api/axios";

const getToken = () => localStorage.getItem("token");

export const createSubscriptionOrder = async (plan) => {
  const response = await API.post(
    "/payment/subscription/create-order",
    { plan },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return response.data;
};

export const verifySubscriptionPayment = async (paymentData) => {
  const response = await API.post("/payment/subscription/verify", paymentData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
