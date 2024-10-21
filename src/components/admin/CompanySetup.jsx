// import React from 'react'
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
// import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
// import useGetCompanyById from "../hooks/useGetCompanyById";

export default function CompanySetup() {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target?.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/admin/companies");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log('singlecompany detail ',singleCompany); /// why it si assigned a undefined value
    setInput({
      name: singleCompany?.name || "",
      // description: singleCompany?.description||"",
      // website:singleCompany?.website|| "",
      // location: singleCompany?.location||"",
      // file:singleCompany?.file|| null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-2 border-b-2 border-b-gray-300">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className=" flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl italic text-red-500">
              Company Setup
            </h1>
          </div>
          <div className="grid grid-cols-2 pt-4 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                onChange={changeFileHandler}
                accept="image/*"
                className="border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
              />
            </div>
          </div>
          <div></div>
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
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
