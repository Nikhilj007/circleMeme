import React, { useEffect, useState } from "react";
import { FaCirclePlus, FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import bgimage from "../assets/gossipsBackground.jpg";
import { RxCross2 } from "react-icons/rx";
import Crush from "./Crush";

const CrushList = () => {
  const userId = localStorage.getItem("userId");
  const [load, setLoad] = useState("null");
  const navigate = useNavigate();
  const [modal,setModal] = useState(false);
  const url = window.location.href;
  const urlHasFirst = url.includes("?first");
  const [isReloading,setReloading] = useState();
  const [crushList, setCrushList] = useState([
    { name: "", department: "" },
  ]);

   useEffect(()=>{
    if(url.includes("?first")){
      if(!url.includes('?r')){
        navigate('/crushes?first&?r')
      }
      setModal(false);
      setLoad(true);
      setCrushList(localStorage.getItem('crushList')?JSON.parse(localStorage.getItem('crushList')):[
        { name: "", department: "" },
      ])
      handleCrushList();
    }
   },[url])

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

  async function handleCrushList() {
    console.log(userId);
    if((userId==='undefined')|| userId==null){
      localStorage.setItem('crushList',JSON.stringify(crushList))
      setModal(true);
      return;
    }
    setLoad("true");
    const filteredCrushList = crushList.filter(
      (crush) => crush.name !==""
    );
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
    setTimeout(() => {
      setLoad("false");
      navigate("/?first");
    }, 2000);  };


  return (
    <div className="w-full max-w-lg ">
      {modal && (
        <div className="fixed inset-0 flex z-40 items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Account</h2>
            <p className="mb-4"> Create account to submit your crush list</p>
            <div className="flex justify-end">
              <button
                onClick={()=>window.location.href="https://circle.net.in/signup.php?crushList"}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Create Account
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
