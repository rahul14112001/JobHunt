import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminJobsTable() {
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
  const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  const navigate=useNavigate();
  useEffect(()=>{
    const filteredJob=allAdminJobs?.length>0 && allAdminJobs?.filter((job)=>{
      if(!searchJobByText)return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())|| job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJob);
  },[allAdminJobs,searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption className='text-red-500'>List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold text-red-500 italic'>Company Name</TableHead>
            <TableHead className='font-bold text-red-500 italic'>Role</TableHead>
            <TableHead className='font-bold text-red-500 italic'>Date</TableHead>
            <TableHead className="text-right font-bold text-red-500 italic">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center font-bold text-xl text-red-600">
                You have not registered any job yet
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}