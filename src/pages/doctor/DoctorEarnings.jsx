import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";
import { getDoctorEarnings } from "../../services/doctorEarningsService";

const DoctorEarnings = () => {
  const [earnings, setEarnings] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const result = await getDoctorEarnings();
        setEarnings(result.earnings);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load earnings");
      }
    };

    fetchEarnings();
  }, []);

  return (
    <DoctorLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">Doctor Earnings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600">
            <p className="text-gray-500">Today</p>
            <h2 className="text-4xl font-bold mt-3">₹ {earnings.today}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
            <p className="text-gray-500">This Week</p>
            <h2 className="text-4xl font-bold mt-3">₹ {earnings.thisWeek}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
            <p className="text-gray-500">This Month</p>
            <h2 className="text-4xl font-bold mt-3">₹ {earnings.thisMonth}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <p className="text-gray-500">Total Earnings</p>
            <h2 className="text-4xl font-bold mt-3">₹ {earnings.total}</h2>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorEarnings;
