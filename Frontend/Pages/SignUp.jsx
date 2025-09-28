import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match ❌", {
        style: { background: "#FEE2E2", color: "#991B1B" },
      });
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/signup`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      });

      toast.success("🎉 Signup successful! Redirecting to login...", {
        style: { background: "#1E3932", color: "#fff" },
        iconTheme: { primary: "#C89B5D", secondary: "#fff" },
      });

      setTimeout(() => navigate("/login", { replace: true }), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed!", {
        style: { background: "#FEE2E2", color: "#991B1B" },
      });
    }
  };

  const goToLog = () => navigate("/login");

  return (
    <main className="min-h-screen flex justify-center items-center px-4 bg-[#F7F3EE] relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        className="absolute top-12 w-24 h-24 bg-white/20 rounded-full blur-3xl"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6 border border-[#E3DDD7]"
      >
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#1E3932] text-white p-3 rounded-full shadow-md"
          >
            <Coffee size={28} />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#1E3932]">Create Account</h1>
          <p className="text-sm text-[#6B7280]">
            Join the coffee lovers community ☕
          </p>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7]"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7]"
          required
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7]"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#1E3932] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#163028] transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <span
            className="text-[#1E3932] font-semibold underline cursor-pointer hover:text-[#C89B5D]"
            onClick={goToLog}
          >
            Sign In
          </span>
        </p>
      </motion.form>
    </main>
  );
};

export default SignUp;
