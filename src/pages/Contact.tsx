import React from "react";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about investing with Al Futura? Our team is here to
            help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your inquiry..."
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Office Address</h3>
                    <p className="text-blue-100">Business Bay, Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone Number</h3>
                    <p className="text-blue-100">+971 4 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email Address</h3>
                    <p className="text-blue-100">info@alfutura.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-blue-100">
                      Sunday - Thursday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">
                    How quickly will you respond to my inquiry?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We aim to respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">
                    Can I schedule a meeting with an investment advisor?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, you can request a meeting with one of our investment
                    advisors through the contact form.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">
                    Do you offer support in multiple languages?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, our support team can assist you in English, Arabic, and
                    several other languages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
