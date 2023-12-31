import { MdArrowBack } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BiSearchAlt } from "react-icons/bi";
import profile from "../assets/user-8.jpg";
import { AiFillLike } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Gossips() {
  const navigate= useNavigate();
  return (
    <div className="bg-zinc-300 w-full">
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
      <div className="w-[95%] bg-white my-2 px-2 border-l-4 border-pink-600 mx-auto">
        <div className="flex gap-2 items-center">
          <div className="w-fit flex flex-col items-center text-3xl">
            <GoTriangleUp />
            <div className="text-base font-semibold">123</div>
            <GoTriangleDown />
          </div>
          <div className="flex justify-between p-3 items-center mb-0">
            <div className="flex gap-3 items-center">
              <div className="rounded-full overflow-hidden h-[36px]">
                <img width={"36px"} height={"27px"} src={profile} alt="fsdf" />
              </div>
              <div className="text-start">
                <div className="font-bold text-pink-600">Subrata Singha</div>
                <div className="text-gray-500">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xl font-bold text-left">
            Would it be possible to give a human artificial gills? 
        </div>
        <div className="text-gray-500 text-left py-3">
            would it be possible to give a human artificial gills, capable of allowing humans to breathe underwater (like a fish) without the need for oxygen tanks? If so, how would it be done?I am not asking if it is possible to make a human breathe underwater.
        </div>
        <div className="flex py-3 px-2 justify-around items-center text-2xl">
            <div className="text-gray-400 border-2 border-gray-400 p-1 rounded-full">
            <AiFillLike/>
            </div>
            <div className="text-blue-600 flex items-center gap-2">
                <MdModeComment/>
                <div className="text-base">4</div>
            </div>
            <div className="text-white bg-black px-3 py-1 rounded-sm">
                Answer
            </div>
        </div>
      </div>
    </div>
  );
}

export default Gossips;
