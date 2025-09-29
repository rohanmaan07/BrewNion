import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import HomePage from "../Component/HomePage";
import Navbar from "../Component/Navbar";



function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <div className="bg-[#F7F3EE] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
