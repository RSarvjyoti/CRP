import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData);
      const { token } = response.data;
      localStorage.setItem("authToken", token); 
      setMessage("Login successful!");
      console.log("Token stored:", token);

      navigate("/"); 
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;