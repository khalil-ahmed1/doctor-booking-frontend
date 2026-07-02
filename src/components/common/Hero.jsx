import { motion } from "framer-motion";
import Button from "./Button";
import Container from "./Container";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Trusted Healthcare Platform
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-tight">
              Book Trusted
              <span className="text-blue-600"> Doctors</span>
              <br />
              Across Rajouri
            </h1>

            <p className="mt-8 text-gray-600 text-xl leading-9">
              Find experienced doctors, schedule appointments instantly, choose
              premium consultation, or request a home visit — all in one place.
            </p>
            <div className="flex gap-5 mt-10">
              <Link to="/doctors">
                <Button>Book Appointment</Button>
              </Link>

              <Link to="/doctors">
                <Button variant="outline">Find Doctors</Button>
              </Link>
            </div>
            <div className="mt-12 flex gap-10">
              <div>
                <h2 className="text-3xl font-bold text-blue-600">1000+</h2>

                <p className="text-gray-500">Patients</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">50+</h2>

                <p className="text-gray-500">Doctors</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-blue-600">24/7</h2>

                <p className="text-gray-500">Support</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <div className="w-[520px] h-[520px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center shadow-2xl">
              <div className="text-center text-white">
                <h1 className="text-7xl font-bold">🏥</h1>

                <p className="mt-4 text-2xl font-semibold">SehatRaj</p>

                <p className="text-blue-100 mt-2">
                  Trusted Healthcare Platform
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );

};

export default Hero;
