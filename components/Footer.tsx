"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface FooterProps {
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

export default function Footer({
  companyName = "AutoDealership",
  address = "123 Main Street, Downtown, City, State 12345",
  phone = "+1 (555) 123-4567",
  email = "info@autodealership.com",
  hours = "Mon-Fri: 9AM-7PM, Sat: 9AM-6PM, Sun: 12PM-5PM"
}: FooterProps) {
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding the perfect vehicle. We offer a wide selection 
              of quality cars with exceptional customer service and competitive prices.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">{address}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`tel:${phone}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`mailto:${email}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <span className="text-gray-300 text-sm">{hours}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} {companyName}. All rights reserved.
            </div>

            {/* Quick Links */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
