
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              SmartBite
            </h3>
            <p className="text-gray-300 mb-4">
              AI-powered dining experience with exceptional cuisine and innovative technology.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-orange-400" />
                <div>
                  <p className="text-sm text-gray-300">123 Gourmet Street</p>
                  <p className="text-sm text-gray-300">Downtown District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-orange-400" />
                <p className="text-sm text-gray-300">(555) 123-BITE</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-orange-400" />
                <p className="text-sm text-gray-300">info@smartbite.com</p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Operating Hours</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Mon - Thu</span>
                <span className="text-sm text-gray-300">11AM - 10PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Fri - Sat</span>
                <span className="text-sm text-gray-300">11AM - 11PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">Sunday</span>
                <span className="text-sm text-gray-300">12PM - 9PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/menu" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                Menu
              </a>
              <a href="/reservations" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                Reservations
              </a>
              <a href="/orders" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                Orders
              </a>
              <a href="/contact" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SmartBite Restaurant. All rights reserved. | 
            <span className="ml-1">Powered by AI Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
