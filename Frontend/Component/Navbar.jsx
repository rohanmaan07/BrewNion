import React from "react";
import { Coffee, Search, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-40 border-b border-[#E3DDD7]">

      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="bg-[#1E3932] p-2 rounded-full"
        >
          <Coffee size={22} className="text-[#C89B5D]" />
        </motion.div>
        <h1 className="text-lg font-bold text-[#1E3932]">BrewNion</h1>
      </div>

      <div className="hidden md:flex gap-8 text-[#1E3932] font-medium">
        <a href="/" className="hover:text-[#C89B5D] transition">Home</a>
        <a href="/menu" className="hover:text-[#C89B5D] transition">Menu</a>
        <a href="/about" className="hover:text-[#C89B5D] transition">About</a>
        <a href="/contact" className="hover:text-[#C89B5D] transition">Contact</a>
      </div>


      <div className="flex items-center gap-6">
        <button className="text-[#1E3932] hover:text-[#C89B5D]">
          <Search size={22} />
        </button>
        <button className="text-[#1E3932] hover:text-[#C89B5D] relative">
          <ShoppingBag size={22} />
          <span className="absolute -top-1 -right-2 bg-[#C89B5D] text-white text-xs px-1 rounded-full">
            2
          </span>
        </button>
        <button className="text-[#1E3932] hover:text-[#C89B5D]">
          <User size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
