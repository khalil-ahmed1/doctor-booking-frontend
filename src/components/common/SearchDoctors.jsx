import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { searchDoctors, getDoctors } from "../../services/doctorService";
import DoctorCard from "./DoctorCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchDoctors = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const result = await getDoctors();
      setDoctors(result.doctors);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const result = await searchDoctors(specialization);
      setDoctors(result.doctors);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground mb-4">
            Search & Book Doctors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse our network of top-rated specialists or search directly for the care you need.
          </p>

          <div className="mt-10 w-full max-w-2xl relative flex items-center shadow-xl rounded-full bg-white border border-border/50 p-2 overflow-hidden transition-all focus-within:shadow-primary/20 focus-within:border-primary/50">
            <Search className="absolute left-6 text-muted-foreground" size={20} />
            <Input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full border-none shadow-none focus-visible:ring-0 text-base pl-12 h-14 bg-transparent"
              placeholder="Search by specialization (e.g., Cardiologist)"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              size="lg"
              className="rounded-full h-12 px-8 font-medium ml-2 shadow-sm"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
            </Button>
          </div>
        </div>

        {/* Doctor Results */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-10">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-muted/30 rounded-3xl border border-border/50">
              <p className="text-lg text-muted-foreground font-medium">
                No doctors found matching your criteria.
              </p>
              <Button variant="link" onClick={() => { setSpecialization(""); loadDoctors(); }} className="mt-2 text-primary">
                Clear search and view all
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchDoctors;
