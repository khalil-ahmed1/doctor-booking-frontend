import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubscriptionModal from "../../components/doctor/SubscriptionModal";
import { getDoctorDashboard } from "../../services/doctorDashboardService";
import DoctorLayout from "../../layouts/DoctorLayout";
import {
  createSubscriptionOrder,
  verifySubscriptionPayment,
} from "../../services/subscriptionService";




const DoctorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
const [openSubscription, setOpenSubscription] = useState(false);
const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const fetchDashboard = async () => {
    try {
      const result = await getDoctorDashboard();

      setDashboard(result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  const handleSubscriptionPayment = async (plan) => {
    try {
      setSubscriptionLoading(true);

      // Create Order
      const orderResponse = await createSubscriptionOrder(plan);

      const { order } = orderResponse;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "SehatRaj",

        description: "Doctor Subscription",

        order_id: order.id,

        handler: async function (response) {
          try {
            await verifySubscriptionPayment({
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Subscription Activated Successfully");

            setOpenSubscription(false);

            fetchDashboard();
          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                "Subscription Verification Failed",
            );
          }
        },

        prefill: {
          name: dashboard.doctor.name,
        },

        theme: {
          color: "#2563EB",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment Failed");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Unable to start subscription",
      );
    } finally {
      setSubscriptionLoading(false);
    }
  };
  if (!dashboard) {
    return (
      <div className="text-center py-20 text-2xl">Loading Dashboard...</div>
    );
  }
const getRemainingDays = () => {
  if (!dashboard.doctor.subscriptionExpiryDate) return 0;

  const today = new Date();
  const expiry = new Date(dashboard.doctor.subscriptionExpiryDate);

  const diff = expiry - today;

  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
};
  return (
    <DoctorLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">
          Welcome Dr. {dashboard.doctor.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
            <p className="text-gray-500">Today's Appointments</p>
            <h2 className="text-4xl font-bold mt-3">
              {dashboard.statistics.total}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <p className="text-gray-500">Pending Payment</p>
            <h2 className="text-4xl font-bold mt-3">
              {dashboard.statistics.pendingPayment}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-500">Checked Patients</p>
            <h2 className="text-4xl font-bold mt-3">
              {dashboard.statistics.checked}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-4xl font-bold mt-3">
              {dashboard.statistics.completed}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-gray-500">Home Visits</p>
            <h2 className="text-4xl font-bold mt-3">
              {dashboard.statistics.homeCount}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-emerald-600">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-4xl font-bold mt-3">
              ₹ {dashboard.statistics.totalRevenue}
            </h2>
          </div>
        </div>
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Today's Summary</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600">
              <h2 className="text-2xl font-bold mb-4">Subscription</h2>

              <p>
                <strong>Status :</strong> {dashboard.doctor.subscriptionStatus}
              </p>

              <p>
                <strong>Plan :</strong> {dashboard.doctor.subscriptionPlan}
              </p>

              <p>
                <strong>Expiry :</strong>{" "}
                {new Date(
                  dashboard.doctor.subscriptionExpiryDate,
                ).toLocaleDateString()}
              </p>

              {(dashboard.doctor.subscriptionStatus === "trial" ||
                dashboard.doctor.subscriptionStatus === "active") && (
                <p className="text-green-600 font-semibold mt-3">
                  {getRemainingDays()} day(s) remaining
                </p>
              )}

              {dashboard.doctor.subscriptionStatus === "expired" && (
                <button
                  onClick={() => setOpenSubscription(true)}
                  className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                >
                  Renew Subscription
                </button>
              )}
            </div>
            <div>
              <p className="text-gray-500">Normal Appointments</p>

              <p className="text-3xl font-bold text-blue-600">
                {dashboard.statistics.normalCount}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Premium Appointments</p>

              <p className="text-3xl font-bold text-purple-600">
                {dashboard.statistics.premiumCount}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Cancelled</p>

              <p className="text-3xl font-bold text-red-600">
                {dashboard.statistics.cancelled}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SubscriptionModal
        open={openSubscription}
        onClose={() => setOpenSubscription(false)}
        onContinue={handleSubscriptionPayment}
        loading={subscriptionLoading}
      />
    </DoctorLayout>
  );
};

export default DoctorDashboard;
