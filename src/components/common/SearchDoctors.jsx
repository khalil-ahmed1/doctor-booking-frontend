import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { searchDoctors, getDoctors } from "../../services/doctorService";
import DoctorCard from "./DoctorCard";

const SearchDoctors = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const result = await getDoctors();

      setDoctors(result.doctors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await searchDoctors(specialization);

      setDoctors(result.doctors);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-center">
            Search & Book Doctors
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Search by doctor specialization or browse our featured doctors.
          </p>

          <div className="mt-8 flex">
            <div className="flex-1 relative">
              <Search
                className="absolute left-5 top-4 text-gray-400"
                size={22}
              />

              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border rounded-l-xl pl-14 pr-4 py-4 outline-none"
                placeholder="Example: Gynecologist"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-r-xl transition"
            >
              Search
            </button>
          </div>

          {/* Doctor Results */}

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-10">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No doctors found for this specialization.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchDoctors;
