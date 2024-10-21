// import React from 'react'

import { useSelector } from "react-redux";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";
import Navbar from "./shared/Navbar.jsx";
// import store from "@/redux/store.js";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  console.log("in jobs : ", allJobs);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        const lowerCaseQuery = searchedQuery.toLowerCase();

        // Check if job title or location matches the searched query
        const titleMatch = job.title.toLowerCase().includes(lowerCaseQuery);
        const locationMatch = job.location
          .toLowerCase()
          .includes(lowerCaseQuery);

        // **Logic for Salary Filtering**
        let salaryMatch = false;
        if (searchedQuery.includes("-")) {
          const [minSalaryStr, maxSalaryStr] = searchedQuery.split("-");
          const minSalary = parseInt(minSalaryStr.replace(/,/g, ""), 10);
          const maxSalary = parseInt(maxSalaryStr.replace(/,/g, ""), 10);
          salaryMatch = job.salary > minSalary && job.salary <= maxSalary;
        }

        return titleMatch || locationMatch || salaryMatch;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5 ml-5">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <div className="text-center m-auto justify-center  font-bold text-red-500">
              Job Not Found
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5 <mark>ml-5</mark> ">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
