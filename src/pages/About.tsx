import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-6">About Al Futura</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Al Futura is a leading real estate investment platform that allows
            investors to access premium Dubai real estate opportunities with
            small amounts of capital.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to democratize real estate investment by making it
            accessible to everyone. We believe that everyone should have the
            opportunity to invest in real estate and benefit from the potential
            returns it offers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
          <p>
            We envision a world where real estate investment is no longer
            limited to the wealthy few, but is accessible to all. Through our
            platform, we aim to create a more inclusive investment landscape
            that empowers individuals to build wealth through real estate.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Transparency:</strong> We believe in complete transparency
              in all our operations and investments.
            </li>
            <li>
              <strong>Accessibility:</strong> We are committed to making real
              estate investment accessible to everyone.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously innovate to provide
              the best investment opportunities and user experience.
            </li>
            <li>
              <strong>Security:</strong> We prioritize the security of our
              investors' data and investments.
            </li>
            <li>
              <strong>Community:</strong> We foster a community of investors who
              share knowledge and experiences.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            Our team consists of experienced professionals from the real estate,
            finance, and technology sectors. Together, we work to identify the
            best investment opportunities and provide a seamless investment
            experience for our users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
