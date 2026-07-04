import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Container from "../../components/common/Container";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight text-primary mb-8">
              About SehatRaj
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground mb-16">
              SehatRaj is an advanced doctor appointment booking platform built to
              connect patients with trusted doctors quickly and securely. We believe in making quality healthcare accessible to everyone through seamless digital experiences.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-border shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Verified Doctors</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Every doctor on SehatRaj undergoes a strict verification process by our administrators before becoming available to patients, ensuring you get the best care.
                </p>
              </div>

              <div className="bg-white border border-border shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Secure Payments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your peace of mind is our priority. All appointments and premium subscriptions are protected using industry-standard secure payment gateways.
                </p>
              </div>

              <div className="bg-white border border-border shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Digital Healthcare</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our core mission is to simplify healthcare management for both patients and clinics across the region, bringing everything into one cohesive platform.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default About;
    