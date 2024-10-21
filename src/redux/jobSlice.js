import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allFilteredJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        ///actions
        setAllJobs:(state,action)=>{
            state.allJobs = Array.isArray(action.payload) ? action.payload : [];
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setSearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs=action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload;
        },
        setAllFilteredJobs:(state,action)=>{
            state.allFilteredJobs=action.payload;
        }
    }
});
export const {setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery,setAllFilteredJobs}=jobSlice.actions;
export default jobSlice.reducer;