import Navbar from "../../components/common/Navbar";
import SearchDoctors from "../../components/common/SearchDoctors";

const Doctors = () => {
  return (
    <>
      <Navbar />

      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">Find the Right Doctor</h1>

          <p className="mt-4 text-xl text-blue-100">
            Search verified doctors by specialization and book appointments
            instantly.
          </p>
        </div>
      </div>

      <SearchDoctors />
    </>
  );
};

export default Doctors;
