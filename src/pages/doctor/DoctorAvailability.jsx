import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";
import {
  updateAvailability,
  getAvailability,
} from "../../services/doctorAvailabilityService";

const DoctorAvailability = () => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [formData, setFormData] = useState({
    // Normal
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

    clinicStartTime: "09:00",
    clinicEndTime: "18:00",

    lunchStart: "13:00",
    lunchEnd: "14:00",

    maxNormalAppointments: 40,

    // Premium
    premiumBookingEnabled: false,
    premiumFee: 500,
    premiumWorkingDays: [],
    premiumStartTime: "17:00",
    premiumEndTime: "20:00",
    premiumSlotDuration: 20,
    premiumClinicAddress: "",
    maxPremiumAppointments: 12,

    // Home Visit
    homeVisitAvailable: false,
    homeVisitFee: 1000,
    homeVisitWorkingDays: [],
    homeVisitStartTime: "16:00",
    homeVisitEndTime: "19:00",
    homeVisitSlotDuration: 30,
    homeVisitBaseAddress: "",
    maxHomeVisits: 1,

    // General
    vacationMode: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWorkingDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };
  const handlePremiumWorkingDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      premiumWorkingDays: prev.premiumWorkingDays.includes(day)
        ? prev.premiumWorkingDays.filter((d) => d !== day)
        : [...prev.premiumWorkingDays, day],
    }));
  };
  const handleHomeVisitWorkingDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      homeVisitWorkingDays: prev.homeVisitWorkingDays.includes(day)
        ? prev.homeVisitWorkingDays.filter((d) => d !== day)
        : [...prev.homeVisitWorkingDays, day],
    }));
  };
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const result = await getAvailability();

        const doctor = result.doctor;

        setFormData({
          // Normal
          workingDays: doctor.workingDays || [],

          clinicStartTime: doctor.clinicStartTime || "09:00",
          clinicEndTime: doctor.clinicEndTime || "18:00",

          lunchStart: doctor.lunchStart || "13:00",
          lunchEnd: doctor.lunchEnd || "14:00",

          maxNormalAppointments: doctor.maxNormalAppointments || 40,

          // Premium
          premiumBookingEnabled: doctor.premiumBookingEnabled || false,
          premiumFee: doctor.premiumFee || 500,
          premiumWorkingDays: doctor.premiumWorkingDays || [],
          premiumStartTime: doctor.premiumStartTime || "17:00",
          premiumEndTime: doctor.premiumEndTime || "20:00",
          premiumSlotDuration: doctor.premiumSlotDuration || 20,
          premiumClinicAddress: doctor.premiumClinicAddress || "",
          maxPremiumAppointments: doctor.maxPremiumAppointments || 12,

          // Home Visit
          homeVisitAvailable: doctor.homeVisitAvailable || false,
          homeVisitFee: doctor.homeVisitFee || 1000,
          homeVisitWorkingDays: doctor.homeVisitWorkingDays || [],
          homeVisitStartTime: doctor.homeVisitStartTime || "16:00",
          homeVisitEndTime: doctor.homeVisitEndTime || "19:00",
          homeVisitSlotDuration: doctor.homeVisitSlotDuration || 30,
          maxHomeVisits: doctor.maxHomeVisits || 1,

          // General
          vacationMode: doctor.vacationMode || false,
        });
      } catch (error) {
        console.error(error);

        toast.error("Failed to load availability");
      }
    };

    fetchAvailability();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAvailability(formData);

      toast.success("Availability Updated");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <DoctorLayout>
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Doctor Availability</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Working Days */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Working Days</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weekDays.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.workingDays.includes(day)}
                    onChange={() => handleWorkingDay(day)}
                  />

                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clinic Timing */}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="font-semibold block mb-2">
                Clinic Start Time
              </label>

              <input
                type="time"
                name="clinicStartTime"
                value={formData.clinicStartTime}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Clinic End Time
              </label>

              <input
                type="time"
                name="clinicEndTime"
                value={formData.clinicEndTime}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          {/* Lunch */}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="font-semibold block mb-2">Lunch Start</label>

              <input
                type="time"
                name="lunchStart"
                value={formData.lunchStart}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Lunch End</label>

              <input
                type="time"
                name="lunchEnd"
                value={formData.lunchEnd}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          {/* Limits */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="font-semibold block mb-2">
                Normal Appointments
              </label>

              <input
                type="number"
                name="maxNormalAppointments"
                value={formData.maxNormalAppointments}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Premium Appointments
              </label>

              <input
                type="number"
                name="maxPremiumAppointments"
                value={formData.maxPremiumAppointments}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Home Visits</label>

              <input
                type="number"
                name="maxHomeVisits"
                value={formData.maxHomeVisits}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          {/* ================= Premium Consultation ================= */}

          <div className="border-t pt-10 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-purple-700">
              ⭐ Premium Consultation
            </h2>

            <div className="mb-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="premiumBookingEnabled"
                  checked={formData.premiumBookingEnabled}
                  onChange={handleChange}
                />

                <span className="font-semibold">
                  Enable Premium Consultation
                </span>
              </label>
              <div className="mb-6">
                <label className="font-semibold block mb-3">
                  Premium Working Days
                </label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weekDays.map((day) => (
                    <label
                      key={day}
                      className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.premiumWorkingDays.includes(day)}
                        onChange={() => handlePremiumWorkingDay(day)}
                      />

                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-semibold block mb-2">
                  Premium Fee (₹)
                </label>

                <input
                  type="number"
                  name="premiumFee"
                  value={formData.premiumFee}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Premium Slot Duration
                </label>

                <input
                  type="number"
                  name="premiumSlotDuration"
                  value={formData.premiumSlotDuration}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="font-semibold block mb-2">
                  Maximum Premium Appointments
                </label>

                <input
                  type="number"
                  name="maxPremiumAppointments"
                  value={formData.maxPremiumAppointments}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  min="1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-semibold block mb-2">
                  Premium Start Time
                </label>

                <input
                  type="time"
                  name="premiumStartTime"
                  value={formData.premiumStartTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Premium End Time
                </label>

                <input
                  type="time"
                  name="premiumEndTime"
                  value={formData.premiumEndTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="font-semibold block mb-2">
                Premium Clinic Address
              </label>

              <textarea
                name="premiumClinicAddress"
                value={formData.premiumClinicAddress}
                onChange={handleChange}
                rows={3}
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          {/* ================= HOME VISIT ================= */}

          <div className="border-t pt-10 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-green-700">
              🏠 Home Visit
            </h2>

            <div className="mb-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="homeVisitAvailable"
                  checked={formData.homeVisitAvailable}
                  onChange={handleChange}
                />

                <span className="font-semibold">Enable Home Visit</span>
              </label>
            </div>

            {/* Working Days */}

            <div className="mb-6">
              <label className="font-semibold block mb-3">
                Home Visit Working Days
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weekDays.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.homeVisitWorkingDays.includes(day)}
                      onChange={() => handleHomeVisitWorkingDay(day)}
                    />

                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="font-semibold block mb-2">
                  Home Visit Fee (₹)
                </label>

                <input
                  type="number"
                  name="homeVisitFee"
                  value={formData.homeVisitFee}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Slot Duration (Minutes)
                </label>

                <input
                  type="number"
                  name="homeVisitSlotDuration"
                  value={formData.homeVisitSlotDuration}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Maximum Home Visits
                </label>

                <input
                  type="number"
                  name="maxHomeVisits"
                  value={formData.maxHomeVisits}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                  min="1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-semibold block mb-2">
                  Home Visit Start Time
                </label>

                <input
                  type="time"
                  name="homeVisitStartTime"
                  value={formData.homeVisitStartTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">
                  Home Visit End Time
                </label>

                <input
                  type="time"
                  name="homeVisitEndTime"
                  value={formData.homeVisitEndTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>
          </div>

          {/* Vacation */}

          <div className="mb-8">
            <label className="flex items-center gap-4">
              <input
                type="checkbox"
                name="vacationMode"
                checked={formData.vacationMode}
                onChange={handleChange}
              />

              <span className="font-semibold text-lg">
                Enable Vacation Mode
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DoctorLayout>
  );
};

export default DoctorAvailability;
