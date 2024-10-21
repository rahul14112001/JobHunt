// import React from 'react'

import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant.jsx";
import { toast } from "sonner";

export default function JobDescription() {
  const params = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const jobId = params.id;
  const isInitiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); //// update the local state
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); /// helps us to real time ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant === user?._id
            )
          ); //// ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-5  ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position}
            </Badge>
            <Badge className={"text-red-700 font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-green-700 font-bold"} variant="ghost">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler} // Pass function reference
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-800"
          }`}
        >
          {`${isApplied ? "Already Applied" : "Apply Now"}`}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-blue-300 text-center text-lg font-bold py-2">
        Job description
      </h1>
      <div className="grid grid-cols-2 my-3">
        <h1 className="font-medium my-1">
          Role:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Location:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Description:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Experience:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.experienceLevel}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Salary:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.salary}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.application?.length}
          </span>
        </h1>
        <h1 className="font-medium my-1">
          Posted Date:
          <span className="pl-4 font-normal text-red-600">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
}
