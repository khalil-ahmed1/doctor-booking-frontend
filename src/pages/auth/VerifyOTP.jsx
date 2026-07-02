import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyResetOTP } from "../../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await verifyResetOTP(email, otp);

      toast.success("OTP Verified Successfully");

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-3">Verify OTP</h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter 6 Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg p-3 mb-6"
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
