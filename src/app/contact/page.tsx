"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import "../globals.css";
import Navbar from "../components/Navbar";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kirim email menggunakan EmailJS
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
        e.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_USER_ID || ""
      )
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          alert("Message Failed to Send: " + error.text);
        }
      );
  };

  return (
    <div className="max-w-8xl mx-auto flex flex-col relative">
      <Navbar />
      <div className="md:mt-[60px]">
        <main className="mt-10 md:mt-1 px-4 flex flex-col gap-8 items-center md:flex-row md:gap-16 md:justify-center min-h-[65vh] md:min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 rounded-2xl shadow-2xl w-full max-w-md bg-gray-800 border border-gray-700"
          >
            <h1 className="text-3xl font-bold text-center mb-6 text-white">
              Contact Me
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-white font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-white mt-2 w-full p-3 border border-gray-600 rounded-xl focus:ring-amber-500 focus:outline-none bg-gray-700 placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-white font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-white mt-2 w-full p-3 border border-gray-600 rounded-xl focus:ring-amber-500 focus:outline-none bg-gray-700 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label
                  htmlFor="message"
                  className="block text-white font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="text-white mt-2 w-full p-3 border border-gray-600 rounded-xl focus:ring-amber-500 focus:outline-none bg-gray-700 placeholder-gray-400"
                  placeholder="Type your message here"
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
