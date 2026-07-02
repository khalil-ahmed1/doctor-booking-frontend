import { Link } from "react-router-dom";
const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
          {doctor.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-bold">{doctor.name}</h2>

          <p className="text-blue-600">{doctor.specialization}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-gray-600">
        <p>📍 {doctor.clinicAddress}</p>

        <p>💼 {doctor.experience} Years Experience</p>

        <p className="font-semibold">₹ {doctor.consultationFee}</p>
      </div>

      <div className="mt-6 flex gap-2">
        {doctor.homeVisitAvailable && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Home Visit
          </span>
        )}

        {doctor.premiumBookingEnabled && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Premium
          </span>
        )}
      </div>

      <Link to={`/doctor/${doctor._id}`}>
        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          View Profile →
        </button>
      </Link>
    </div>
  );
};

export default DoctorCard;
