import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("otp");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = data;
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("🎉 Login successful! Redirecting...", {
        style: { background: "#1E3932", color: "#fff" },
        iconTheme: { primary: "#C89B5D", secondary: "#fff" },
      });

      setTimeout(() => {
        if (user.role === "admin") navigate("/admin", { replace: true });
        else navigate("/", { replace: true });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌", {
        style: { background: "#FEE2E2", color: "#991B1B" },
      });
    }
  };

  const handleSendOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        phone: formData.phone,
      });
      toast.success("📲 OTP sent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP ❌");
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        phone: formData.phone,
        otp: formData.otp,
      });
      const { token, user } = data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("✅ OTP verified! Redirecting...");
      setTimeout(() => {
        if (user.role === "admin") navigate("/admin", { replace: true });
        else navigate("/", { replace: true });
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed ❌");
    }
  };

  const goToRegister = () => navigate("/signup");

  return (
    <main className="min-h-screen flex justify-center items-center px-4 bg-[#F7F3EE] relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.form
        onSubmit={activeTab === "email" ? handleSubmitEmail : handleSubmitOtp}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6 border border-[#E3DDD7]"
      >
        
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#1E3932] text-white p-3 rounded-full shadow-md"
          >
            <Coffee size={28} />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#1E3932]">Welcome Back</h1>
          <p className="text-sm text-[#6B7280]">Sign in to your coffee world ☕</p>
        </div>

        <div className="flex w-full bg-[#F7F3EE] rounded-lg p-1">
          <button
            type="button"
            onClick={() => setActiveTab("otp")}
            className={`w-1/2 py-2 rounded-md font-medium ${
              activeTab === "otp"
                ? "bg-[#1E3932] text-white"
                : "text-[#1E3932] bg-transparent"
            }`}
          >
            Phone/OTP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`w-1/2 py-2 rounded-md font-medium ${
              activeTab === "email"
                ? "bg-[#1E3932] text-white"
                : "text-[#1E3932] bg-transparent"
            }`}
          >
            Email/Password
          </button>
        </div>

        {activeTab === "email" && (
          <>
            <label htmlFor="email" className="block text-sm font-medium text-[#1E3932]">
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#C89B5D" }}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7] focus:outline-none"
              required
            />

            <label htmlFor="password" className="block text-sm font-medium text-[#1E3932]">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#C89B5D" }}
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7] focus:outline-none"
              required
            />

            <p className="text-center text-sm text-[#6B7280]">
              Don’t have an account?{" "}
              <span
                onClick={goToRegister}
                className="text-[#1E3932] font-semibold underline cursor-pointer hover:text-[#C89B5D]"
              >
                Register
              </span>
            </p>
          </>
        )}
        {activeTab === "otp" && (
          <>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1E3932]">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <motion.input
                whileFocus={{ scale: 1.02, borderColor: "#C89B5D" }}
                type="tel"
                name="phone"
                placeholder="+1 (XXX) XXX-XXXX"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg border border-[#E3DDD7] focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-[#1E3932] text-white px-4 rounded-lg hover:bg-[#163028]"
              >
                Send OTP
              </button>
            </div>

            <label htmlFor="otp" className="block text-sm font-medium text-[#1E3932] mt-2">
              Enter OTP
            </label>
            <motion.input
              whileFocus={{ scale: 1.02, borderColor: "#C89B5D" }}
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="bg-[#F7F3EE] text-[#1E3932] p-3 rounded-lg w-full border border-[#E3DDD7] focus:outline-none"
              required
            />
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-[#1E3932] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#163028] transition"
        >
          {activeTab === "email" ? "Sign In" : " Sign In"}
        </motion.button>
      </motion.form>
    </main>
  );
};

export default Login;
