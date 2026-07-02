import Container from "../../components/common/Container";

const About = () => {
  return (
    <Container>
      <div className="py-20 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-700 mb-8">
          About SehatRaj
        </h1>

        <p className="text-lg leading-8 text-gray-700">
          SehatRaj is an advanced doctor appointment booking platform built to
          connect patients with trusted doctors quickly and securely.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Verified Doctors</h2>

            <p>
              Every doctor on SehatRaj is verified by the administrator before
              becoming available to patients.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Secure Payments</h2>

            <p>
              Appointments and subscriptions are protected using Razorpay's
              secure payment gateway.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Digital Healthcare</h2>

            <p>
              Our goal is to simplify healthcare for patients and clinics across
              India.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
    