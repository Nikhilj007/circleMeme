import { AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";


function Question({gossip}) {
    
  function timeAgo(timeString) {
    const currentTime = new Date();
    const pastTime = new Date(timeString);
    const timeDifference = currentTime - pastTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  }

    return ( 
        <div className=" bg-white my-1 max-w-lg px-2 mx-auto">
        <div className="flex gap-2 items-center">
          <div className="w-fit flex flex-col items-center text-3xl">
            <GoTriangleUp />
            <div className="text-base font-semibold">{gossip.upvotes}</div>
            <GoTriangleDown />
          </div>
          <div className="flex justify-between p-3 items-center mb-0">
            <div className="flex gap-3 items-center">
              <div className="rounded-full overflow-hidden h-[36px]">
                <img width={"36px"} height={"27px"} src={`http://circle.net.in/upload/${gossip.profile_pic}`} alt="fsdf" />
              </div>
              <div className="text-start">
                <div className="font-bold text-pink-600">{gossip.username}</div>
                <div className="text-gray-500">{timeAgo(gossip.date_time)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xl font-bold text-left ml-4">
            {gossip.question} 
        </div>
        <div className="text-gray-500 text-left ml-4 py-3">
            {gossip.topAnswer ? gossip.topAnswer : "No answers yet"}
        </div>
        <div className="flex py-3 px-2 justify-between gap-6 items-center text-xl">
            <div className="flex justify-start gap-6 items-center text-xl">
            <div className="text-gray-400 border-2 border-gray-400 p-1 rounded-full">
            <div className="text-lg"><AiFillLike/></div>
            </div>
            <div className="text-gray-600 flex items-center gap-2">
                <MdComment/>
                <div className="text-base">{gossip.no_of_answers}</div>
            </div>
            <div className="text-white bg-black text-sm px-3 py-1 rounded-sm">
                Answer
            </div>
            </div>
            <div><PiShareFat/></div>
        </div>
      </div>
     );
}

export default Question;