// import React from 'react'

import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button.jsx";
import { Badge } from "./ui/badge.jsx";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable.jsx";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs.jsx";


// const skillArr = ["HTML", "CSS", "JS", "React"];
// const skillArr=[];

export default function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log('user', user);
  const isHaveResume = user?.profile?.resume;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              className="h-11 w-11"
              style={{ height: "4.25rem", width: "4.25rem" }}
            >
              {user?.profile?.profilePhoto ? (
                <AvatarImage src={user.profile.profilePhoto} />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-bold rounded-full">
                  {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 my-2">
          <h1 className=" text-red-600 font-bold">Skills :</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  variant="ghost"
                  className="text-blue-500 bg-gray-200"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-blue-600 font-sm text-l">NA</span>
            )}
          </div>
        </div>
        <div className="flex max-w-sm w-full items-center gap-2">
          <Label className="font-bold text-medium text-red-500">Resume:</Label>
          {isHaveResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-blue-600 font-sm text-l">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white  rounded-2xl">
        <h1 className="font-bold text-xl text-blue-500 text-center">
          Applied Jobs
        </h1>
        <hr className="h-px my-2 bg-blue-200 border-0 dark:bg-blue-700" />
        {/* APPLIED JOB TABLE */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}
