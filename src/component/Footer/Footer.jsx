import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-lg bg-teal-600 p-2 shadow-md">
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Ask<span className="text-teal-600">Health</span>Now
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Your trusted partner for instant AI health guidance, expert doctor consultations, and reliable medical supplies. Anytime, anywhere.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-teal-600 hover:text-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "AI Health Chat", path: "/" },
                { name: "Consult a Doctor", path: "/consult-doctor" },
                { name: "Medical Stores", path: "/medical-stores" },
                { name: "Health Plans", path: "/pricing" },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="group flex items-center text-sm text-slate-500 transition hover:text-teal-600">
                    <ArrowRight size={14} className="mr-2 opacity-0 transition-all group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">Support</h4>
            <ul className="space-y-4">
              {["Terms of Service", "Privacy Policy", "Refund Policy", "Contact Us", "FAQs"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-500 transition hover:text-teal-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin size={18} className="shrink-0 text-teal-600" />
                <span>123 Health Tech Lane, Digital City, 560001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Phone size={18} className="shrink-0 text-teal-600" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <Mail size={18} className="shrink-0 text-teal-600" />
                <span>support@askhealthnow.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-100 pt-8 text-center">
          <p className="text-xs text-slate-400">
            © {currentYear} AskHealthNow. All rights reserved. 
            <span className="mx-2">|</span> 
            Made with ❤️ for better health.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;