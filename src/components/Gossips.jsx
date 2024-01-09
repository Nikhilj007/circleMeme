import { MdArrowBack } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import {  GoTriangleUp } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import Question from "./Questions";
function Gossips() {
  const navigate= useNavigate();
  return (
    <div className="bg-zinc-300 w-full mb-14">
      <div className="flex items-center bg-white py-3 justify-around w-full">
        <div className="flex gap-3">
          <button onClick={()=>navigate(-1)} className="text-3xl">
            <MdArrowBack />
          </button>
          <div className="bg-green-600 px-3 py-1 rounded-sm text-white flex items-center">
            <div className="text-xl">
              <BiSearchAlt />
            </div>
            Search
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-black text-white rounded-sm flex items-center px-3 py-1">
            <div className="bg-white text-black rounded-full">
              <BsQuestionCircle />
            </div>{" "}
            Ask A Question
          </div>
          <div className="bg-black text-white p-2 rounded-full">
            <GoTriangleUp />
          </div>
        </div>
      </div>
      <Question/>
      <Question/>
      
    </div>
  );
}

export default Gossips;
