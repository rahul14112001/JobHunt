//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // import React from 'react'

import { useEffect, useState } from "react";
import { Label } from "./ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group.jsx"
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-5,00,000", "5,00,000-10,00,000", "10,00,000-20,00,000"],
  },
];

export default function FilterCard() {
  const dispatch=useDispatch();
  const [selectedValue,setSelectedValue]=useState('');
  const changeHandler=(value)=>{
    setSelectedValue(value);
  }
useEffect(()=>{
  // console.log(selectedValue);
  dispatch(setSearchedQuery(selectedValue));
},[dispatch,selectedValue]);

  return (
    <div className="w-full bg-white rounded-md p-3">
      <h1 className="font-bold text-lg text-blue-600">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg text-red-600 " >{data.filterType}</h1>
            {data.array.map((item, ind) => {
              const itemId=`id${index}-${ind}`
              return (
                <div key={ind} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId} >{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

