import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorById, getPremiumSlots } from "../../services/doctorService";
import {
  bookNormalAppointment,
  bookPremiumAppointment,
  bookHomeVisitAppointment,
} from "../../services/appointmentService";
import { createOrder, verifyPayment } from "../../services/paymentService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  getHomeVisitSlots,
} from "../../services/doctorService";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  console.log("Doctor ID:", id);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Premium Booking Modal
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const [premiumDate, setPremiumDate] = useState("");

  const [premiumTime, setPremiumTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showHomeModal, setShowHomeModal] = useState(false);

  const [visitDate, setVisitDate] = useState("");



  const [homeAddress, setHomeAddress] = useState("");

  const [homeLandmark, setHomeLandmark] = useState("");

  const [homeCity, setHomeCity] = useState("");
  const [homeVisitSlots, setHomeVisitSlots] = useState([]);

  const [selectedHomeSlot, setSelectedHomeSlot] = useState("");

  const [homePincode, setHomePincode] = useState("");
  const handleBookNormal = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      // 1. Create Appointment
      const booking = await bookNormalAppointment(doctor._id);

      // 2. Create Razorpay Order
      const orderResponse = await createOrder(booking.appointment._id);

      const { order } = orderResponse;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Nexora Health",

        description: "Doctor Appointment",

        order_id: order.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Appointment Booked Successfully!");

            navigate("/my-appointments");
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Payment Verification Failed",
            );
          }
        },

        prefill: {
          name: user.name,

          email: user.email,

          contact: user.mobile,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment Failed");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };
const handlePremiumBooking = async () => {
  if (!premiumDate || !premiumTime) {
    toast.error("Please select date and slot");
    return;
  }

  try {
    // 1. Create Premium Appointment
    const booking = await bookPremiumAppointment(
      doctor._id,
      premiumDate,
      premiumTime,
    );

    // 2. Create Razorpay Order
    const orderResponse = await createOrder(booking.appointment._id);

    const { order } = orderResponse;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "SehatRaj",

      description: "Premium Doctor Appointment",

      order_id: order.id,

      handler: async function (response) {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          toast.success("Premium Appointment Booked Successfully!");

          setShowPremiumModal(false);

          navigate("/my-appointments");
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Payment Verification Failed",
          );
        }
      },

      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function () {
      toast.error("Payment Failed");
    });

    razorpay.open();
  } catch (error) {
    console.error(error);

    toast.error(error.response?.data?.message || "Booking Failed");
  }
};

const fetchHomeVisitSlots = async (date) => {
  try {
    const result = await getHomeVisitSlots(doctor._id, date);

    setHomeVisitSlots(result.availableSlots);
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Unable to load slots");
  }
};

const handleHomeVisitBooking = async () => {
 if (
   !visitDate ||
   !selectedHomeSlot ||
   !homeAddress ||
   !homeCity ||
   !homePincode
 ) {
   toast.error("Please fill all required fields");
   return;
 }

  try {
    // 1. Create Home Visit Appointment
    const booking = await bookHomeVisitAppointment(
      doctor._id,
      visitDate,
    selectedHomeSlot,
      homeAddress,
      homeLandmark,
      homeCity,
      homePincode,
    );

    // 2. Create Razorpay Order
    const orderResponse = await createOrder(booking.appointment._id);

    const { order } = orderResponse;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "SehatRaj",

      description: "Home Visit Appointment",

      order_id: order.id,

      handler: async function (response) {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          toast.success("Home Visit Booked Successfully!");

          setShowHomeModal(false);

          navigate("/my-appointments");
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Payment Verification Failed",
          );
        }
      },

      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      },

      theme: {
        color: "#16a34a",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function () {
      toast.error("Payment Failed");
    });

    razorpay.open();
  } catch (error) {
    console.error(error);

    toast.error(error.response?.data?.message || "Booking Failed");
  }

};

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const result = await getDoctorById(id);

        console.log("Doctor API Result:", result);

        setDoctor(result.doctor);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

useEffect(() => {
  const loadSlots = async () => {
    if (!premiumDate || !doctor) return;

    try {
      const result = await getPremiumSlots(doctor._id, premiumDate);

      setAvailableSlots(result.availableSlots);
    } catch (error) {
      console.error(error);
    }
  };

  loadSlots();
}, [premiumDate, doctor]);
useEffect(() => {
  const loadHomeSlots = async () => {
    if (!visitDate || !doctor) return;

    try {
      const result = await getHomeVisitSlots(doctor._id, visitDate);

      setHomeVisitSlots(result.availableSlots);
    } catch (error) {
      console.error(error);
    }
  };

  loadHomeSlots();
}, [visitDate, doctor]);

  if (loading) {
    return <div className="text-center py-20 text-2xl">Loading doctor...</div>;
  }

  if (!doctor) {
    return (
      <div className="text-center py-20 text-red-600 text-2xl">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10">
        <div className="flex items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-700">
            {doctor.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-4xl font-bold">{doctor.name}</h1>

            <p className="text-blue-600 text-xl mt-2">
              {doctor.specialization}
            </p>

            <p className="text-gray-600 mt-2">{doctor.qualification}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="font-bold text-xl mb-3">Doctor Information</h2>

            <p>
              <strong>Experience:</strong> {doctor.experience} Years
            </p>

            <p>
              <strong>Clinic:</strong> {doctor.clinicName}
            </p>

            <p>
              <strong>Address:</strong> {doctor.clinicAddress}
            </p>

            <p>
              <strong>Working Days:</strong> {doctor.workingDays.join(", ")}
            </p>

            <p>
              <strong>Clinic Time:</strong> {doctor.clinicStartTime} -{" "}
              {doctor.clinicEndTime}
            </p>

            <p>
              <strong>Lunch:</strong> {doctor.lunchStart} - {doctor.lunchEnd}
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Consultation Fees</h2>

            <p>Normal: ₹ {doctor.consultationFee}</p>

            {doctor.premiumBookingEnabled && (
              <p>Premium: ₹ {doctor.premiumFee}</p>
            )}

            {doctor.homeVisitAvailable && (
              <p>Home Visit: ₹ {doctor.homeVisitFee}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={handleBookNormal}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Book Normal
          </button>

          {doctor.premiumBookingEnabled && (
            <button
              onClick={() => setShowPremiumModal(true)}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl"
            >
              Book Premium
            </button>
          )}

          {doctor.homeVisitAvailable && (
            <button
              onClick={() => setShowHomeModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Book Home Visit
            </button>
          )}
        </div>
      </div>

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Premium Appointment</h2>

            <label className="block font-semibold mb-2">Select Date</label>

            <input
              type="date"
              value={premiumDate}
              onChange={(e) => setPremiumDate(e.target.value)}
              className="w-full border rounded-lg p-3 mb-5"
            />

            <label className="block font-semibold mb-2">
              Available Premium Slots
            </label>

            <div className="grid grid-cols-3 gap-3">
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setPremiumTime(slot)}
                    className={`border rounded-lg py-2 transition ${
                      premiumTime === slot
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 col-span-3">
                  Select a date to view available slots.
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="px-5 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handlePremiumBooking}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showHomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">🏠 Book Home Visit</h2>

            {/* Visit Date */}
            <input
              type="date"
              value={visitDate}
              onChange={(e) => {
                setVisitDate(e.target.value);
                fetchHomeVisitSlots(e.target.value);
              }}
              className="w-full border rounded-lg p-3 mb-4"
            />

            {/* Available Slots */}
            <div className="mb-5">
              <label className="font-semibold block mb-3">
                Available Time Slots
              </label>

              <div className="grid grid-cols-2 gap-3">
                {homeVisitSlots.length > 0 ? (
                  homeVisitSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedHomeSlot(slot)}
                      className={`border rounded-lg py-2 transition ${
                        selectedHomeSlot === slot
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white hover:bg-green-50"
                      }`}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2">
                    Select a date to view available slots.
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <textarea
              placeholder="Full Address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              className="w-full border rounded-lg p-3 mb-3"
            />

            {/* Landmark */}
            <input
              type="text"
              placeholder="Landmark"
              value={homeLandmark}
              onChange={(e) => setHomeLandmark(e.target.value)}
              className="w-full border rounded-lg p-3 mb-3"
            />

            {/* City */}
            <input
              type="text"
              placeholder="City"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              className="w-full border rounded-lg p-3 mb-3"
            />

            {/* Pincode */}
            <input
              type="text"
              placeholder="Pincode"
              value={homePincode}
              onChange={(e) => setHomePincode(e.target.value)}
              className="w-full border rounded-lg p-3 mb-6"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHomeModal(false)}
                className="px-5 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleHomeVisitBooking}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default DoctorProfile;
