import API from "../api/axios";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// Send OTP
export const forgotPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// Verify OTP
export const verifyResetOTP = async (email, otp) => {
  const response = await API.post("/auth/verify-reset-otp", {
    email,
    otp,
  });

  return response.data;
};

// Reset Password
export const resetPassword = async (email, newPassword) => {
  const response = await API.post("/auth/reset-password", {
    email,
    newPassword,
  });

  return response.data;
};