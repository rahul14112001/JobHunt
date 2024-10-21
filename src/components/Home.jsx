// import React from 'react'

import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import CategoryCarousel from "./CategoryCarousel.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection.jsx";
import LatestJobs from "./LatestJobs.jsx";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  });
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
}
