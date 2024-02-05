import React from "react";
import { MdArrowBack } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useState } from "react";


const CrushList = () => {
  const userId = localStorage.getItem("userId");
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center p-2 py-4 text-lg justify-between font-semibold shadow-lg">
        <div
          className="cursor-pointer text-2xl"
          onClick={() => window.history.back()}
        >
          <MdArrowBack />
        </div>
        <div className="sm:-translate-x-16">Share your College Crush List</div>
        <div></div>
      </div>
      <div className="ml-16 mt-4">
        <div className="flex items-start mt-1 gap-3">
          <div className="mt-1">
            <MdCheckBoxOutlineBlank />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <div className="text-start p-2 px-4 rounded-sm bg-gray-200 w-fit">Crush 1</div>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" placeholder="Name"/>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" name="" id="" placeholder="department"/>
          </div>
        </div>
        <div className="flex items-start mt-1 gap-3">
          <div className="mt-1">
            <MdCheckBoxOutlineBlank />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <div className="text-start p-2 px-4 rounded-sm bg-gray-200 w-fit">Crush 2</div>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" placeholder="Name"/>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" name="" id="" placeholder="department"/>
          </div>
        </div>
        <div className="flex items-start mt-1 gap-3">
          <div className="mt-1">
            <MdCheckBoxOutlineBlank />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <div className="text-start p-2 px-4 rounded-sm bg-gray-200 w-fit">Crush 3</div>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" placeholder="Name"/>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" name="" id="" placeholder="department"/>
          </div>
        </div>
        
        {showMore &&<><div className="flex items-start mt-1 gap-3">
          <div className="mt-1">
            <MdCheckBoxOutlineBlank />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <div className="text-start p-2 px-4 rounded-sm bg-gray-200 w-fit">Crush 4</div>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" placeholder="Name"/>
            <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" name="" id="" placeholder="department"/>
          </div>
        </div>
        <div className="flex items-start mt-1 gap-3">
        <div className="mt-1">
          <MdCheckBoxOutlineBlank />
        </div>
        <div className="flex flex-col gap-3 justify-start">
          <div className="text-start p-2 px-4 rounded-sm bg-gray-200 w-fit">Crush 5</div>
          <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" placeholder="Name"/>
          <input type="text" className="border-[1px] rounded-sm p-2 focus:outline-none" name="" id="" placeholder="department"/>
        </div>
      </div></>}
      <button className="text-blue-500" onClick={()=>setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
      <button
        className="bg-blue-500 text-white rounded-md  p-2 mt-4"
        type="submit"
      >Submit</button>
    </div>
  );
};

export default CrushList;
