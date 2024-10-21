// eslint-disable-next-line no-unused-vars
import { setLoading } from "@/redux/authSlice";
import { setAllFilteredJobs, setAllJobs } from "@/redux/jobSlice";
// import store from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/constant.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function useGetAllJobs() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  // console.log("in usegetalljob serched query is ", searchedQuery);
  useEffect(() => {
    const fetchAllSearchedJobs = async () => {
      try {
        const res2 = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        // console.log("res2 in usegetalljobs :", res2);

        if (res2.data.success) {
          // console.log("in usegetalljobs :", res.data.jobs);
          dispatch(setAllFilteredJobs(res2.data.jobs));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        // console.log("erroor in usegetalljobs.jsx");
      } finally {
        setLoading(false);
      }
    };
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        const res1 = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        // console.log("res1 in usegetalljobs :", res1);
        if (res1.data.success) {
          dispatch(setAllJobs(res1.data.jobs));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllJobs();

    if (searchedQuery) {
      fetchAllSearchedJobs();
    }
  }, [searchedQuery, dispatch]);
  return { loading };
}
