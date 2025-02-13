"use client";

import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // Memastikan token benar-benar dihapus
      setIsLoggedIn(false);
      setMenuOpen(false); // Menutup menu setelah logout
    }
  };

  return (
    <nav className="sticky top-0 z-20 shadow-md h-[70px] w-full bg-gray-950 flex justify-between md:justify-around items-center text-white font-serif px-6">
      <div>
        <span className="text-[30px] hover:text-amber-400 font-bold">
          halozra();
        </span>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-[20px]">
        <NavItem href="/" label="Home" />
        {isLoggedIn && <NavItem href="/posts" label="Posts" />}
        <NavItem href="/contact" label="Contact" />
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hover:text-amber-400 transition-all duration-200 ease-in-out transform hover:translate-y-[-2px]"
          >
            Logout
          </button>
        ) : (
          <NavItem href="/login" label="Login" />
        )}
      </div>
      {/* GitHub Icon (Desktop) */}
      <div className="hidden md:block">
        <GitHubLink />
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="hover:text-amber-400 transition"
        >
          <span className="text-3xl">{menuOpen ? "✖" : "☰"}</span>
        </button>
        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute top-[70px] right-0 bg-black/70 w-full text-center py-4 shadow-lg rounded-b-xl transition-transform duration-300 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-4 text-[20px]">
            <NavItem href="/" label="Home" onClick={toggleMenu} />
            {isLoggedIn && (
              <NavItem href="/posts" label="Posts" onClick={toggleMenu} />
            )}
            <NavItem href="/contact" label="Contact" onClick={toggleMenu} />
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-amber-400 transition-all duration-200 ease-in-out transform hover:translate-y-[-2px]"
                >
                  Logout
                </button>
              ) : (
                <NavItem href="/login" label="Login" onClick={toggleMenu} />
              )}
            </li>
            <li>
              <GitHubLink />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Komponen NavItem untuk menghindari kode duplikat
function NavItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="hover:text-amber-400 transition-all duration-200 ease-in-out transform hover:translate-y-[-2px]"
    >
      {label}
    </Link>
  );
}

// Komponen GitHubLink agar lebih reusable
function GitHubLink() {
  return (
    <a
      href="https://github.com/halozra"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-amber-400 transition"
      title="Visit GitHub"
    >
      <GitHubIcon fontSize="large" />
    </a>
  );
}
