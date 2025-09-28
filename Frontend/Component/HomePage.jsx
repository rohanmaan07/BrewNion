import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <section className="relative bg-[#F7F3EE] min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-28 h-28 sm:w-40 sm:h-40 bg-[#C89B5D]/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-[#1E3932]/20 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-16 lg:px-24 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center md:justify-start"
        >
          <motion.img
            src="/Images/cofee.jpg"
            alt="Coffee cup"
            className="w-64 sm:w-100 h-100 md:w-[420px] lg:w-[700px] rounded-3xl shadow-2xl border-4 border-[#C89B5D]/40 object-cover"
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left md:pl-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#1E3932] leading-tight">
            Sip the <span className="text-[#C89B5D]">Best Coffee</span> <br />
            Every Morning
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6B7280] max-w-md mx-auto md:mx-0">
            Start your day with rich flavors, crafted from 100% natural beans.
            Freshly brewed to boost your productivity & brighten your mood. ✨
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center bg-[#C89B5D] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:bg-[#B78C4E] transition text-base sm:text-lg font-semibold"
            >
              Order Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center border-2 border-[#1E3932] text-[#1E3932] px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-sm hover:bg-[#1E3932] hover:text-white transition text-base sm:text-lg font-semibold"
            >
              Explore Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;
