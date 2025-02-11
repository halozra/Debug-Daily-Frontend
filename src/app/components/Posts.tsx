import React, { useEffect, useState } from "react";
import axios from "axios";

// Definisikan tipe untuk Post
interface PostProps {
  title: string;
  description: string;
  image: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

function PostAll({ title, description, image }: PostProps) {
  const fallbackImage = "https://via.placeholder.com/150"; // Fallback image URL

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transition-transform hover:scale-110 ">
      <img
        src={image || fallbackImage} // Using fallback image if image is not available
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
  const [posts, setPosts] = useState<Post[]>([]); // Menyimpan data posts dengan tipe Post
  const [loading, setLoading] = useState<boolean>(true); // Menyimpan status loading
  const [error, setError] = useState<string | null>(null); // State for errors

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setPosts(response.data); // Mengambil data dari response axios
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <p className="text-xl mb-8 text-start">Blog Posts Terbaru</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Pertama - Lebar & Panjang */}
        <div className="lg:col-span-2 row-span-2 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300  transition-transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg"
            alt="Gambar Blog"
            className="w-full h-84 object-cover"
          />
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Judul Post Utama</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ini adalah deskripsi singkat dari post utama. Karena ini post
              penting, kamu bisa tulis lebih banyak dan detail di sini buat
              menarik perhatian pembaca!
            </p>
            <button className="text-blue-500 hover:underline">
              Baca Selengkapnya →
            </button>
          </div>
        </div>

        {/* Display Error */}
        {error && (
          <div className="col-span-1 lg:col-span-3 text-center text-red-500 p-4">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          // Menampilkan pesan jika tidak ada post
          <p className="col-span-1 lg:col-span-3 text-center text-gray-500">
            Tidak ada data post yang ditemukan.
          </p>
        ) : (
          posts.map((post) => (
            <PostAll
              key={post.id} // Menggunakan id sebagai key
              title={post.title}
              description={post.description}
              image={post.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
