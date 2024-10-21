/* eslint-disable react/prop-types */
// import React from 'react'

import {useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function LatestJobCards({job}) {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position}
        </Badge>
        <Badge className={"text-red-700 font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-green-700 font-bold"} variant="ghost">
          {job?.salary} 
        </Badge>
      </div>
    </div>
  );
}