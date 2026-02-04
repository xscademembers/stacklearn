import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMessageCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand & Mission */}
          <div>
            <div className="text-2xl font-bold text-brand mb-4">
              Stack Learn
            </div>
            <p className="text-sm mb-4">
              Empowering students to study abroad with expert guidance, global
              partnerships, and transparent support at every step.
            </p>
            <p className="text-xs text-gray-400">
              ISO Certified | Trusted by 5000+ Students
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block transform">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/trainings" className="hover:text-primary-400 transition-colors">
                  Trainings
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-primary-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/study-abroad-steps" className="hover:text-primary-400 transition-colors">
                  Study Abroad Steps
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-primary-400 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Blog / Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-primary-400 transition-colors">
                  Branches
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/scholarships" className="hover:text-primary-400 transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  Guides & FAQs
                </Link>
              </li>
              <li>
                <Link href="/test-prep" className="hover:text-primary-400 transition-colors">
                  Test Preparation
                </Link>
              </li>
              <li>
                <Link href="/study-abroad-steps" className="hover:text-primary-400 transition-colors">
                  Study Abroad Process
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-primary-400 transition-colors">
                  Application Process
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-primary-400 transition-colors">
                  Payment Gateway
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-primary-400 transition-colors">
                  Certificate Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Information */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-bold text-white mb-2 text-base">Head Office</p>
                <p className="text-gray-300">Stack Learn, Hyderabad, Telangana, India</p>
              </div>
              <div>
                <p className="font-bold text-white mb-2 text-base">Phone</p>
                <a
                  href="tel:+919606031842"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium"
                >
                  +91-9606031842
                </a>
              </div>
              <div>
                <p className="font-bold text-white mb-2 text-base">Email</p>
                <a
                  href="mailto:info@stacklearn.com"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium"
                >
                  info@stacklearn.com
                </a>
              </div>
              <div>
                <p className="font-bold text-white mb-2 text-base">Office Hours</p>
                <p className="text-gray-300">Mon–Sat | 10:00 AM – 5:00 PM</p>
              </div>
              <div className="pt-4 space-y-2">
                <Link
                  href="/contact"
                  className="block w-full px-4 py-3 bg-brand text-white rounded-full text-center font-bold hover:shadow-xl hover:shadow-brand/40 hover:scale-105 transition-all duration-300 transform text-sm"
                >
                  Book Free Counselling
                </Link>
                <a
                  href="https://wa.me/919606031842"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300 transform text-sm font-semibold"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Legal & Social */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              <p>Copyright © 2025 Stack Learn. All Rights Reserved.</p>
              <p className="text-xs mt-1">Version: v2.0 | Updated: November 2025</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://wa.me/919606031842"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/stacklearn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/stacklearn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/stacklearn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@stacklearn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
