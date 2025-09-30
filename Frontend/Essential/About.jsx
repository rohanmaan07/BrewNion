import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative bg-[#F7F3EE] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-10 right-20 w-32 h-32 sm:w-44 sm:h-44 bg-[#C89B5D]/30 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 sm:w-56 sm:h-56 bg-[#1E3932]/20 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16 lg:px-24 w-full max-w-7xl">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3932] leading-tight">
            About <span className="text-[#C89B5D]">Us</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#6B7280] max-w-md mx-auto md:mx-0">
            We’re passionate about serving the finest coffee that sparks joy in
            every sip. From carefully sourced beans to hand-crafted brews, our
            mission is simple: bring people together over the warmth of a perfect cup.
          </p>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-md mx-auto md:mx-0">
            With every blend, we promise freshness, quality, and a cozy
            experience that makes your mornings brighter and evenings calmer.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <motion.img
            src="/Images/About.png"
            alt="About our coffee shop"
            className="w-72 sm:w-96 md:w-[440px] lg:w-[500px] h-[550px] rounded-3xl shadow-2xl border-4 border-[#C89B5D]/40 object-cover"
            whileHover={{ scale: 1.06, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
