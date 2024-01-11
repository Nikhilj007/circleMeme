import profile from "../assets/user-8.jpg";
import { AiFillLike } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

function Question() {
    return ( 
        <div className=" bg-white my-1 px-2 mx-auto">
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
        <div className="flex py-3 px-2 justify-start gap-6 items-center text-xl">
            <div className="text-gray-400 border-2 border-gray-400 p-1 rounded-full">
            <div className="text-lg"><AiFillLike/></div>
            </div>
            <div className="text-blue-600 flex items-center gap-2">
                <MdModeComment/>
                <div className="text-base">4</div>
            </div>
            <div className="text-white bg-black text-sm px-3 py-1 rounded-sm">
                Answer
            </div>
        </div>
      </div>
     );
}

export default Question;