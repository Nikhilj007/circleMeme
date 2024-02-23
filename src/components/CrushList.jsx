import React, { useState } from "react";
import { MdArrowBack, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaCirclePlus, FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../assets/gossipsBackground.jpg";
import { BsQuestionCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Crush from "./Crush";

const CrushList = () => {
  const userId = localStorage.getItem("userId");
  const [load, setLoad] = useState("null");
  const navigate = useNavigate();
  
  const url = window.location.href;
  const urlHasFirst = url.includes("?first");
  const [crushList, setCrushList] = useState([
    { name: "", department: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedCrushList = [...crushList];
    updatedCrushList[index][field] = value;
    setCrushList(updatedCrushList);
  };

  const handleDelete = (index) => {
    const updatedCrushList = [...crushList];
    updatedCrushList.splice(index, 1);
    setCrushList(updatedCrushList);
  };

  const handleCrushList = async () => {
    const isValid = crushList.every((crush) => crush.name && crush.department);

    if (!isValid) {
      alert("Please fill out the department for all crushes.");
      return;
    }
    setLoad("true");
    //filter out empty crushes
    const filteredCrushList = crushList.filter(
      (crush) => crush.name && crush.department
    );
    console.log(filteredCrushList);
    const res = await fetch(
      "https://circle-backend-ewrpf36y4q-el.a.run.app/api/crush_list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          crush: filteredCrushList,
        }),
      }
    ).catch((err) => console.log(err));
    const data = await res.json();
    console.log(data);
    navigate("/");
  };


  return (
    <div className="w-full max-w-lg ">
      <div className=" max-w-lg relative">
        <img src={bgimage} alt="" />
        <Link to={`${urlHasFirst?'/?first':'/college'}`}
          className="cursor-pointer absolute top-4 left-2 text-2xl"
        >
          <RxCross2 />
        </Link>
        <div className="absolute bottom-2 flex justify-around w-full">
          <div className="flex cursor-pointer bg-pink-700  items-center bg-opacity-30 gap-2 px-4 py-2 rounded-lg">
            <div className="text-white text-sm opacity-100">
              share your crush list from your college 😍
            </div>
          </div>
        </div>
      </div>
      {load == "true" ? (
        <div className="text-center min-h-screen justify-center flex items-center">
          You will be notified if you get a match.
        </div>
      ) : (
        <>
          <Link
            to="/cldetail"
            className="flex items-center justify-end px-2 text-[#5d5df3] mt-4"
          >
            Read how crush list works
          </Link>
          {
            crushList.map((crush, index) => (
              <Crush
                handleDelete={handleDelete}
                key={index}
                index={index}
                crush={crush}
                handleChange={handleChange}
              />
            ))
          }
          <div onClick={() => setCrushList([...crushList, { name: "", department: "" }])} 
           className="text-start text-[#5d5df3] px-8 cursor-pointer"><FaCirclePlus className="inline mb-1" /> <span className="underline ">Add more</span> </div>
          {/* Submit Button */}
          <button
            onClick={handleCrushList}
            className="bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full p-2 px-12 my-4 transition-colors duration-500 mt-10"
            type="submit"
          >
            {load == "true" ? "Loading..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
};

export default CrushList;
