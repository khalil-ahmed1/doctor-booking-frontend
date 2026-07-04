import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Container from "./Container";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, Stethoscope } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Abstract Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <ShieldCheck className="w-4 h-4" />
              <span>Premium Healthcare Platform</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
              Book Trusted <br />
              <span className="text-primary italic">Doctors</span> Across
              Rajouri
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Experience seamless healthcare. Find experienced specialists, schedule appointments instantly, and manage your well-being with our modern platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link to="/doctors">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base shadow-lg hover:shadow-primary/25 transition-all">
                  Book Appointment
                </Button>
              </Link>

              <Link to="/doctors">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-base border-primary/20 hover:bg-primary/5">
                  Find Doctors
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div>
                <h2 className="text-3xl font-semibold text-primary mb-1">1000+</h2>
                <p className="text-sm text-muted-foreground font-medium">Patients</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-primary mb-1">50+</h2>
                <p className="text-sm text-muted-foreground font-medium">Specialists</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-primary mb-1">24/7</h2>
                <p className="text-sm text-muted-foreground font-medium">Support</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-[540px] aspect-square flex items-center justify-center"
          >
            {/* Main Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/80 to-primary/20 shadow-2xl animate-pulse-slow" />
            
            {/* Glass Card Overlay */}
            <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                <Stethoscope className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">SehatRaj</h2>
              <div className="flex items-center gap-2 text-white/90 bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium">
                <Activity className="w-4 h-4" />
                <span>Live Availability</span>
              </div>
            </div>
            
            {/* Decorative Orbs */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/20 backdrop-blur-md rounded-full border border-white/30" />
            <div className="absolute top-12 -right-4 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/30" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
