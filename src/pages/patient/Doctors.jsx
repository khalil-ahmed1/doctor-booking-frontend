import Navbar from "../../components/common/Navbar";
import SearchDoctors from "../../components/common/SearchDoctors";
import Footer from "../../components/common/Footer";

const Doctors = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight">Find the Right Doctor</h1>

            <p className="mt-4 text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Search verified doctors by specialization and book appointments
              instantly.
            </p>
          </div>
        </div>

        <SearchDoctors />
      </main>
      
      <Footer />
    </div>
  );
};

export default Doctors;
