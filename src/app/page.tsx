"use client";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import Posts from "./components/Posts";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Banner />
      <Posts />

    </div>
  );
}
