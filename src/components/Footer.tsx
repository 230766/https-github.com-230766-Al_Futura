import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/team" className="text-gray-600 hover:text-blue-600">Team</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-blue-600">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-blue-600">Press</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-600 hover:text-blue-600">Guides</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-600 hover:text-blue-600">Cookie Policy</Link></li>
              <li><Link to="/investor-protection" className="text-gray-600 hover:text-blue-600">Investor Protection</Link></li>
              <li><Link to="/risk-disclosure" className="text-gray-600 hover:text-blue-600">Risk Disclosure</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">support@alfutura.com</li>
              <li className="text-gray-600">+1 (234) 567-890</li>
              <li className="text-gray-600">123 Investment Street</li>
              <li className="text-gray-600">New York, NY 10001</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
