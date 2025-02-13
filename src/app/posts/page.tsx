'use client'
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

// Definisikan tipe untuk Post
interface Post {
  title: string;
  description: string;
  image: string;
}

function PostAll({ title, description, image }: Post) {
  const fallbackImage = "https://via.placeholder.com/150"; // Fallback image URL

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transition-transform hover:scale-110 ">
      <img
        src={image || fallbackImage}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="text-blue-500 hover:underline">
          Baca Selengkapnya →
        </button>
      </div>
    </div>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null); // Reset error before submitting
    setLoading(true); // Show loading state

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login first.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/create-post",
        {
          title: newPost.title,
          description: newPost.description,
          image: newPost.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Post berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Failed to add post. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* Pesan Sukses */}
        {successMessage && (
          <p className="bg-green-100 text-green-700 p-4 rounded-lg mb-4 text-center">
            {successMessage}
          </p>
        )}

        {/* Pesan Error */}
        {error && (
          <p className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}

        {/* Form Tambah Post */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Tambah Post Baru</h2>
          <input
            type="text"
            placeholder="Judul"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <textarea
            placeholder="Deskripsi"
            value={newPost.description}
            onChange={(e) =>
              setNewPost({ ...newPost, description: e.target.value })
            }
            className="w-full p-3 border rounded-lg mb-4"
            rows={4}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Loading..." : "Tambah Post"}
          </button>
        </form>
      </div>
    </>
  );
}
