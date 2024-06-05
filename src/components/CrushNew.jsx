import React, { useEffect, useState } from "react";
import { FaCirclePlus, FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../assets/gossipsBackground.jpg";
import { RxCross2 } from "react-icons/rx";
import Crush from "./Crush";

const CrushLis = () => {
  const userId = localStorage.getItem("userId");
  const [load, setLoad] = useState("null");
  const navigate = useNavigate();
  const url = window.location.href;
  const urlHasFirst = url.includes("?first");
  const [crushList, setCrushList] = useState([
    { name: "", department: "" },
  ]);

   useEffect(()=>{
      setLoad(true);
      setCrushList(localStorage.getItem('crushList')?JSON.parse(localStorage.getItem('crushList')):[
        { name: "", department: "" },
      ])
      handleCrushList();
   },[])

  async function handleCrushList() {
    const filteredCrushList = crushList.filter(
      (crush) => crush.name !==""
    );
    const res = await fetch(
      "https://anonymously.link/backend/api/crush_list",
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
    setTimeout(() => {
      navigate("/?first");
    }, 2000);  };


  return (
    <div className="w-full max-w-lg mb-10 ">

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
        <div className="text-center min-h-screen justify-center flex items-center">
          You will be notified if you get a match.
        </div>
    </div>
  );
};

export default CrushLis;
