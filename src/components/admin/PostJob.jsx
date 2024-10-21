// import React from 'react'

import { Label } from "@radix-ui/react-label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";
// import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
// import { setAllJobs } from "@/redux/jobSlice";
import { setAllJobs } from "@/redux/jobSlice";

// const companyArray = [];

export default function PostJob() {
  const dispatch=useDispatch();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log("res", res);

      if (res.data.success) {
        toast.success(res.data.message);
        // console.log('res data jobs in postjob: ',res.data.job);
        dispatch(setAllJobs(res.data.job));
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log("hello");
      console.log(error);
      // console.log("guys");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <Button
            onClick={() => navigate("/admin/jobs")}
            className=" flex items-center gap-2 font-semibold text-gray-200 bg-red-600 hover:bg-red-700"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <div className="grid grid-cols-2  gap-2">
            <div className="p-5">
              <Label className="font-medium text-sm">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 "
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
            <div className="p-5">
              <Label className="font-medium text-sm">No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400"
              />
            </div>
          </div>
          <div className="p-5 mb-5">
            {companies.length > 0 && (
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, companyId: value })
                }
              >
                <SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 border border-gray-400 w-[180px] ">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem value={company._id} key={company._id}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800"
          >
            Post New Job
          </Button>
 */}

          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 bg-blue-600  animate-spin " />
              please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 my-4"
            >
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs font-bold text-red-600 text-center my-3">
              *Please register a company first,before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
