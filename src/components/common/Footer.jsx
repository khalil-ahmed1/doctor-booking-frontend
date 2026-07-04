import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="bg-white inline-block p-2 rounded-xl">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Experience seamless healthcare. Find experienced specialists, schedule appointments instantly, and manage your well-being with our modern platform.
            </p>
            <div className="flex gap-4 text-sm font-bold">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">TW</a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">IN</a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors">Find a Doctor</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Specialities</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/doctors?specialty=cardiology" className="hover:text-primary transition-colors">Cardiology</Link></li>
              <li><Link to="/doctors?specialty=neurology" className="hover:text-primary transition-colors">Neurology</Link></li>
              <li><Link to="/doctors?specialty=orthopedics" className="hover:text-primary transition-colors">Orthopedics</Link></li>
              <li><Link to="/doctors?specialty=pediatrics" className="hover:text-primary transition-colors">Pediatrics</Link></li>
              <li><Link to="/doctors?specialty=dentistry" className="hover:text-primary transition-colors">Dentistry</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, Rajouri</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@sehatraj.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} SehatRaj. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
