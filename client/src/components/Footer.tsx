import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-deep-gray text-white">
      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-copper rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-bolt text-white text-lg"></i>
                </div>
                <span className="font-montserrat font-bold text-xl">CopperBear</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Your trusted partner for premium electrical products and professional services. Quality, reliability, and excellence in every product we offer.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-copper mt-1 mr-3 flex-shrink-0"></i>
                  <span className="text-gray-300">
                    8, 1st Cross Road, Kempegowda Rd<br />
                    Near ICICI Bank, Madurai<br />
                    Tamil Nadu 560009, India
                  </span>
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
                  <i className="fab fa-whatsapp text-copper mr-3"></i>
                  <span className="text-gray-300">WhatsApp: +91 98765 43210</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
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
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-copper">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-copper transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-copper transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Products Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-copper">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/categories" className="text-gray-300 hover:text-copper transition-colors">
                    All Categories
                  </Link>
                </li>
                <li>
                  <Link href="/brands" className="text-gray-300 hover:text-copper transition-colors">
                    Featured Brands
                  </Link>
                </li>
                <li>
                  <Link href="/products?featured=true" className="text-gray-300 hover:text-copper transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/products?discount=true" className="text-gray-300 hover:text-copper transition-colors">
                    Best Deals
                  </Link>
                </li>
                <li>
                  <Link href="/wholesale" className="text-gray-300 hover:text-copper transition-colors">
                    Wholesale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services & Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-copper">Services & Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-copper transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Installation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Maintenance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-copper transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 CopperBear Electricals. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Return Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-copper transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Bar */}
      <div className="bg-copper py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="text-white font-medium mb-2 md:mb-0">
              Need Help? Contact Our Experts Today!
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <a href="tel:+919876543210" className="text-white hover:text-copper-100 transition-colors font-medium">
                📞 Call: +91 98765 43210
              </a>
              <a href="https://wa.me/919876543210" className="text-white hover:text-copper-100 transition-colors font-medium">
                💬 WhatsApp: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}