/* eslint-disable react/prop-types */
// import React from 'react'

import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import { useNavigate } from "react-router-dom";

export default function Job({job}) {
  const navigate=useNavigate();
  ///// eslint-disable-next-line no-unused-vars
  // const jobId='hdjkdhskd';

  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDiff=currentTime-createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));
  }

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500" >{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={(job?.company?.logo)?(job?.company?.logo):"https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg" >{job?.company?.name}</h1>
          <p className="font-sm text-gray-600 text-medium" >{job?.location}</p>
        </div>
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
      <div className="flex items-center gap-2 mt-4" >
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' className='hover:bg-red-500' >Details</Button>
        <Button className='bg-blue-500 hover:bg-[#1e40af]'>Save for later</Button>
      </div>
    </div>
  );
}
