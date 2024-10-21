import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
const shortListingStatus = ["Accepted", "Rejected"];
export default function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler=async(status,id)=>{
    try {
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption className="text-red-500">
          A list of your recent applied user
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-red-500 italic">
              FullName
            </TableHead>
            <TableHead className="font-bold text-red-500 italic">
              Email
            </TableHead>
            <TableHead className="font-bold text-red-500 italic">
              Contact
            </TableHead>
            <TableHead className="font-bold text-red-500 italic">
              Resume
            </TableHead>
            <TableHead className="font-bold text-red-500 italic">
              Date
            </TableHead>
            <TableHead className="font-bold text-red-500 italic text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.application?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell  >
                  {
                    item?.applicant?.profile?.resume ?  <a href={item?.applicant?.profile?.resume} className='text-blue-500 cursor-pointer'>{item?.applicant?.profile?.resumeOriginalName}</a>:<span>NA</span>
                  }
                    </TableCell>
                <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={()=>statusHandler(status,item._id)}
                            key={index}
                            className="flex items-center gap-2 w-fit cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
