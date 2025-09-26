import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig"; 

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);

      alert(response.data.message || "Signup successful! Please proceed to login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.error || "Signup failed!");
    }
  };

  const goToLog = () => {
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{ backgroundColor: "rgb(1, 9, 12)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#142836] text-[#DCE3E9] p-10 rounded-xl w-full max-w-md shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Create Account</h2>

        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#DCE3E9] text-[#142836] font-semibold py-3 rounded-lg hover:bg-white hover:text-[#142836] transition"
        >
          Register
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <span
            onClick={goToLog}
            className="text-white underline cursor-pointer hover:text-[#DCE3E9]"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
