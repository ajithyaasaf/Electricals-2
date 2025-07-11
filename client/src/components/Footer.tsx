import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-deep-gray text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-copper rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-bolt text-white text-lg"></i>
              </div>
              <span className="font-montserrat font-bold text-xl">CopperBear</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for quality electrical products and professional installation services in Madurai.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-copper transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-copper transition-colors">Products</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-copper transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-copper transition-colors">Contact</Link></li>
              <li><Link href="/support" className="text-gray-300 hover:text-copper transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/home-installation" className="text-gray-300 hover:text-copper transition-colors">Home Installation</Link></li>
              <li><Link href="/services/wiring" className="text-gray-300 hover:text-copper transition-colors">Wiring Services</Link></li>
              <li><Link href="/services/repair" className="text-gray-300 hover:text-copper transition-colors">Repair & Maintenance</Link></li>
              <li><Link href="/services/commercial" className="text-gray-300 hover:text-copper transition-colors">Commercial Solutions</Link></li>
              <li><Link href="/services/emergency" className="text-gray-300 hover:text-copper transition-colors">Emergency Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-copper mr-3"></i>
                <span className="text-gray-300">123 Electrical Street, Madurai, Tamil Nadu 625001</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-copper mr-3"></i>
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-copper mr-3"></i>
                <span className="text-gray-300">info@copperbear.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock text-copper mr-3"></i>
                <span className="text-gray-300">Mon-Sat: 9AM-7PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 CopperBear. All rights reserved. | <Link href="/privacy" className="hover:text-copper">Privacy Policy</Link> | <Link href="/terms" className="hover:text-copper">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
