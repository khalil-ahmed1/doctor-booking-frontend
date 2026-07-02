import Container from "../../components/common/Container";

const Contact = () => {
  return (
    <Container>
      <div className="py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-700 mb-10">Contact Us</h1>

        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="space-y-6 text-lg">
            <p>
              <strong>Company:</strong> SehatRaj
            </p>

            <p>
              <strong>Email:</strong> support@sehatraj.com
            </p>

            <p>
              <strong>Phone:</strong> +91 XXXXXXXXXX
            </p>

            <p>
              <strong>Location:</strong> Rajouri, Jammu & Kashmir, India
            </p>

            <p>
              We are committed to providing secure and reliable healthcare
              appointment services for patients and doctors.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
    