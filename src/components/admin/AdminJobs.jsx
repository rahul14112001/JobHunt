
import { Input } from "../ui/input";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

export default function AdminJobs() {
  useGetAllAdminJobs();
  const [input,setInput]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(setSearchJobByText(input));
  },[input])
  
  return (
    <div>
      <Navbar />    
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit  focus-visible:ring-offset-0 focus-visible:ring-0 border-2 border-blue-300 focus:border-blue-500 rounded-md" placeholder="Filter by name or role" onChange={(e)=>setInput(e.target.value)} />
          <Button onClick={()=>navigate('/admin/jobs/create')} className='bg-blue-600 hover:bg-blue-800 text-gray-200'>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}
