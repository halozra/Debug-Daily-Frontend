"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

// Definisikan tipe untuk Post
interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

function PostAll({ title, description, image }: Omit<Post, "id">) {
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State untuk pesan sukses

  // State untuk Form
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({
    title: "",
    description: "",
    image: "",
  });

  // Fetch Posts dari API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/posts", {
        id: Date.now(), // Menggunakan timestamp sebagai ID unik
        ...newPost,
      });

      setPosts([response.data.post, ...posts]); // Tambahkan post baru ke list
      setNewPost({ title: "", description: "", image: "" }); // Reset form
      setSuccessMessage(
        "Post berhasil ditambahkan! Mengarahkan ke halaman utama..."
      ); // Tampilkan pesan sukses

      // Redirect ke root directory setelah 2 detik
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error adding post:", error);
      setError("Failed to add post. Please try again.");
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
          >
            Tambah Post
          </button>
        </form>
      </div>
    </>
  );
}
