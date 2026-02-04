// src/sections/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutUs = ({ onNavigate }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div
      className="relative w-full h-screen overflow-auto"
      style={{ transform: "translateZ(0)", willChange: "opacity" }}
    >
      {/* Hero section with title */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Title */}
          <motion.div variants={fadeInUp} className="mb-12">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6"
              style={{ letterSpacing: "0.02em" }}
            >
              About Novalorx Labs
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </motion.div>

          {/* Introduction */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            At Novalorx Labs, we believe in crafting stellar digital experiences that transform ideas into reality. Founded with a mission to push the boundaries of technology, we bring together exceptional talent and cutting-edge innovation to deliver solutions that matter.
          </motion.p>

          {/* Mission Section */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900/50 border border-white/10 rounded-lg p-8 mb-12 backdrop-blur-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To empower businesses and individuals with innovative digital solutions that inspire, engage, and drive measurable results. We're committed to excellence in every project we undertake.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Innovation",
                  description: "Pushing boundaries and exploring new possibilities in technology",
                },
                {
                  title: "Excellence",
                  description: "Delivering quality solutions with meticulous attention to detail",
                },
                {
                  title: "Collaboration",
                  description: "Working together with clients and team to achieve shared goals",
                },
                {
                  title: "Integrity",
                  description: "Building trust through transparency and ethical practices",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-lg p-6 hover:border-blue-500/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900/50 border border-white/10 rounded-lg p-8 mb-12 backdrop-blur-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Why Choose Novalorx Labs?
            </h2>
            <ul className="space-y-4">
              {[
                "Expert team with years of experience across multiple domains",
                "Cutting-edge technology stack and best practices",
                "Client-focused approach with transparent communication",
                "Proven track record of successful project delivery",
                "Dedicated support and continuous improvement",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-4 text-gray-300"
                >
                  <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => onNavigate("services")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Explore Services
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate("contacts")}
              className="px-8 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-lg transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
