// import { setSingleCompany } from "@/redux/companySlice.jsx";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useGetCompanyById(companyId) {
    // console.log('company id in usegetcompanybyid : ',compa  nyId);
    const dispatch=useDispatch();
    // console.log('hello you are in usegetcompanyby id')
  useEffect(()=>{
    const fetchSingleCompany=async()=>{
        try {
           const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
          //  console.log(res);
           if(res.data.success){
            // console.log('company id in usegetcompanybyid : ',companyId,"company detail ",res.data.company);
            dispatch(setSingleCompany(res.data.company));
           } 
        } catch (error) {
            console.log(error);
            // console.log('erroor in usegetalljobs.jsx');
        }
    }
    fetchSingleCompany();
  },[companyId,dispatch])
}