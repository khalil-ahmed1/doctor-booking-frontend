import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Container from "../../components/common/Container";
import { Card, CardContent } from "../../components/ui/card";
import { Stethoscope, Star, Home, Ticket, ShieldCheck, Mail } from "lucide-react";

const services = [
  {
    title: "Normal Consultation",
    description:
      "Book regular appointments with verified doctors at affordable consultation fees.",
    icon: <Stethoscope className="w-10 h-10 text-primary" />,
  },
  {
    title: "Premium Consultation",
    description:
      "Skip the waiting queue by booking premium consultation slots with your preferred doctor.",
    icon: <Star className="w-10 h-10 text-amber-500" />,
  },
  {
    title: "Home Visit",
    description:
      "Schedule home visits from doctors who provide healthcare services at your doorstep.",
    icon: <Home className="w-10 h-10 text-emerald-500" />,
  },
  {
    title: "Digital Appointment Ticket",
    description:
      "Receive instant appointment confirmation with downloadable digital tickets.",
    icon: <Ticket className="w-10 h-10 text-indigo-500" />,
  },
  {
    title: "Secure Payments",
    description:
      "All payments are processed securely through Razorpay with instant confirmation.",
    icon: <ShieldCheck className="w-10 h-10 text-rose-500" />,
  },
  {
    title: "Email Notifications",
    description:
      "Get appointment confirmations and important updates directly in your inbox.",
    icon: <Mail className="w-10 h-10 text-cyan-500" />,
  },
];

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-20">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight text-primary mb-4">
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to make medical consultations easy, secure, and accessible for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-3xl overflow-hidden group">
                <CardContent className="p-8">
                  <div className="bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
