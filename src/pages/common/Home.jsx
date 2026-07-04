import Navbar from "../../components/common/Navbar";
import Hero from "../../components/common/Hero";
import SearchDoctors from "../../components/common/SearchDoctors";
import Footer from "../../components/common/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SearchDoctors />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
