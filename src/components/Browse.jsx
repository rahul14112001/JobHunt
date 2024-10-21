// import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Browse() {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allFilteredJobs } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 mt text-blue-600">
          Search Results ({allFilteredJobs.length}){" "}
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allFilteredJobs.map((job) => {
            return (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
              >
                <Job key={job._id} job={job} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
