/* eslint-disable react/prop-types */
import { Label } from "./ui/label.jsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.jsx";
import { setUser } from "@/redux/authSlice.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(", ") || '', // Convert array to string
    profilePhoto: null, // Initialize for profile photo
    resume: null, // Initialize for resume
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setInput({ ...input, [name]: files[0] }); // Capture the selected file
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills); // Send as a string

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto); // Append profile photo
    }

    if (input.resume) {
      formData.append("resume", input.resume); // Append resume
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/profile");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-center font-medium border-b-2 border-b-gray-300 py-2">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid outline-none gap-6 py-4">
              {/* Name Input */}
              <div className="grid grid-cols-4 items-center gap-4 outline-none">
                <Label htmlFor="fullname" className="text-right">Name</Label>
                <input
                  id="fullname"
                  className="col-span-3 border px-1 py-0.5 border-gray-400 rounded-lg outline-none "
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                />
              </div>

              {/* Bio Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <input
                  id="bio"
                  className="col-span-3 border px-1 py-0.5 border-gray-400 outline-none rounded-lg"
                  name="bio"
                  type="text"
                  value={input.bio}
                  onChange={changeEventHandler}
                />
              </div>

              {/* Email Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <input
                  id="email"
                  className="col-span-3 border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                />
              </div>

              {/* Phone Number Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
                <input
                  id="phoneNumber"
                  className="col-span-3 border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                />
              </div>

              {/* Skills Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <input
                  id="skills"
                  className="col-span-3 border px-1 py-0.5 border-gray-400 rounded-lg outline-none"
                  name="skills"
                  value={input.skills} // Keep as a string for easy editing
                  onChange={changeEventHandler}
                />
              </div>

              {/* Profile Photo Input */}
              <div className="grid grid-cols-4 items-center text-right gap-2">
                <Label className="font-semibold">Profile Photo</Label>
                <input
                  accept="image/*"
                  name="profilePhoto" // Change to match what backend expects
                  type="file"
                  className="col-span-3"
                  onChange={fileChangeHandler}
                />
              </div>

              {/* Resume Input */}
              <div className="grid grid-cols-4 items-center text-right gap-2">
                <Label htmlFor="resume">Resume</Label>
                <input
                  id="resume"
                  className="col-span-3"
                  name="resume" // Ensure this matches what backend expects
                  type="file"
                  accept=".pdf" // Specify accepted file type
                  onChange={fileChangeHandler}
                />
              </div>
            </div>

            {/* Submit Button */}
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                  please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-blue-500 my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}