import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompaniesTable() {
  const { companies,searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany,setFilterCompany]=useState(companies);
  const navigate=useNavigate();
  useEffect(()=>{
    const filteredCompany=companies.length>0 && companies.filter((company)=>{
      if(!searchCompanyByText)return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption className='text-red-500'>List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='font-bold text-red-500 italic'>Logo</TableHead>
            <TableHead className='font-bold text-red-500 italic'>Name</TableHead>
            <TableHead className='font-bold text-red-500 italic'>Date</TableHead>
            <TableHead className="text-right font-bold text-red-500 italic">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center font-bold text-xl text-blue-600">
                You have not registered any company yet🥲
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo ? company?.logo:"https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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