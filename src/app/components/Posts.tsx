import React, { useEffect, useState } from "react";
import axios from "axios";

interface PostProps {
  title: string;
  description: string;
  image: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
}

function PostAll({ title, description, image }: PostProps) {
  const fallbackImage = "https://via.placeholder.com/150";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transition-transform hover:scale-110">
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
        {/* <button className="ml-16 hover:text-red-500">delete</button> */}
      </div>
    </div>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        if (!token) {
          setError("Unauthorized: Silakan login terlebih dahulu.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://debug-daily-backend.vercel.app/api/auth/posts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPosts(response.data);
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized: Silakan login terlebih dahulu.");
          }
        } else {
          setError("Terjadi kesalahan saat menghubungi server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <p className="text-xl mb-8 text-start">Blog Posts Terbaru</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Display Error */}
        {error && (
          <div className="col-span-1 lg:col-span-3 text-center text-red-500 p-4">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading posts...
          </p>
        ) : posts.length === 0 ? (
          <p className="col-span-1 lg:col-span-3 text-center text-gray-500">
            Tidak ada data post yang ditemukan.
          </p>
        ) : (
          posts.map((post) => (
            <PostAll
              key={post._id}
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
