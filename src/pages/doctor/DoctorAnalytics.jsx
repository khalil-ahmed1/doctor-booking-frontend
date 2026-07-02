import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";

import { getDoctorAnalytics } from "../../services/doctorAnalyticsService";

const DoctorAnalytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getDoctorAnalytics();

        setAnalytics(result.analytics);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <DoctorLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">Doctor Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Total</p>
            <h2 className="text-3xl font-bold">
              {analytics.totalAppointments}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Normal</p>
            <h2 className="text-3xl font-bold">
              {analytics.normalAppointments}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Premium</p>
            <h2 className="text-3xl font-bold">
              {analytics.premiumAppointments}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Home Visit</p>
            <h2 className="text-3xl font-bold">
              {analytics.homeVisitAppointments}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p>Checked</p>
            <h2 className="text-3xl font-bold">
              {analytics.checkedAppointments}
            </h2>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorAnalytics;
