// import React from 'react'

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";


export default function HeroSection() {
  const [query,setQuery]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchJobHandler=()=>{
    console.log('query',query);
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-[#EE4B2B]">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search,Apply & <br />
          Get your <span className="text-[#2d9aec]">Dream Jobs</span>{" "}
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          corrupti numquam quaerat dignissimos ex.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto gap-4" >
          <input
            className="outline-none border-none w-full"
            type="text"
            placeholder="Find Your Dream Jobs"
            onChange={(e)=>setQuery(e.target.value)}
          />
          <Button onClick={searchJobHandler} className='rounded-r-full bg-[#2d9aec]' >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
