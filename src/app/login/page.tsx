"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";

// Interface untuk state credentials
interface Credentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "" });
  const router = useRouter();

  // Fungsi handleChange dengan typing yang benar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Fungsi handleSubmit dengan error handling yang lebih aman
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const token = response.data.token;
      localStorage.setItem("token", token);
      alert("Login successful!");
      console.log("token:", token);
      router.push("/"); // Redirect ke halaman dashboard setelah login
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Log In
            </button>
            <p className="m-5">You dont have accout?<a href="/register" className="hover:text-yellow-500">Create Account</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
