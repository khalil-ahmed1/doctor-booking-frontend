import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Container from "../../components/common/Container";
import { Card, CardContent } from "../../components/ui/card";
import { MapPin, Mail, Phone, Building } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold tracking-tight text-primary mb-4">Contact Us</h1>
              <p className="text-lg text-muted-foreground">We are here to help. Reach out to us for any inquiries.</p>
            </div>

            <Card className="border-border/50 shadow-lg rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardContent className="p-10 md:p-14">
                <div className="space-y-8 text-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Building size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Company</p>
                      <p className="font-semibold text-foreground">SehatRaj Healthcare</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Email</p>
                      <p className="font-semibold text-foreground">support@sehatraj.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Phone</p>
                      <p className="font-semibold text-foreground">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Location</p>
                      <p className="font-semibold text-foreground">Rajouri, Jammu & Kashmir, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-center text-muted-foreground italic">
                    We are committed to providing secure and reliable healthcare
                    appointment services for patients and doctors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
    