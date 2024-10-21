import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.message) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl text-blue-500 font-bold">
            Job<span className="text-red-500">Hunt</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="bg-[#3b82f6] hover:bg-[#1e40af]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#3b82f6] hover:bg-[#1e40af]">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage src={user.profile.profilePhoto} />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-bold rounded-full">
                      {user?.fullname
                        ? user.fullname.charAt(0).toUpperCase()
                        : "?"}
                    </div>
                  )}{" "}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2 rounded-lg shadow-xl bg-white border border-gray-300 ">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage src={user.profile.profilePhoto} />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white font-bold rounded-full">
                        {user?.fullname
                          ? user.fullname.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    {user && user.role === "student" && (
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col my-2 gap-3 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      LogOut
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}