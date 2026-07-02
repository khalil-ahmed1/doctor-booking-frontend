import Container from "../../components/common/Container";

const services = [
  {
    title: "Normal Consultation",
    description:
      "Book regular appointments with verified doctors at affordable consultation fees.",
    icon: "🩺",
  },
  {
    title: "Premium Consultation",
    description:
      "Skip the waiting queue by booking premium consultation slots with your preferred doctor.",
    icon: "⭐",
  },
  {
    title: "Home Visit",
    description:
      "Schedule home visits from doctors who provide healthcare services at your doorstep.",
    icon: "🏠",
  },
  {
    title: "Digital Appointment Ticket",
    description:
      "Receive instant appointment confirmation with downloadable digital tickets.",
    icon: "🎫",
  },
  {
    title: "Secure Payments",
    description:
      "All payments are processed securely through Razorpay with instant confirmation.",
    icon: "💳",
  },
  {
    title: "Email Notifications",
    description:
      "Get appointment confirmations and important updates directly in your inbox.",
    icon: "📧",
  },
];

const Services = () => {
  return (
    <Container>
      <div className="py-20">
        <h1 className="text-5xl font-bold text-center text-blue-700 mb-12">
          Our Services
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-5">{service.icon}</div>

              <h2 className="text-2xl font-bold mb-3">{service.title}</h2>

              <p className="text-gray-600 leading-7">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Services;
