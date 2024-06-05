import React, { useState } from "react";
import {
  PiArrowFatUpFill,
  PiArrowFatUpLight,
  PiArrowFatDownFill,
  PiArrowFatDownLight,
} from "react-icons/pi";

const Comment = ({ answer }) => {
  const [upvoted, setUpvoted] = useState(answer.upvoted);
  const userId = localStorage.getItem("userId");
  const [upvotes, setUpvotes] = useState(answer.upvotes);
  const [showMore, setShowMore] = useState(false);
  const timeAgo = (date) => {
    const d = new Date(date);
    const timeAgo = new Date() - d;
    const seconds = timeAgo / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (days > 1) {
      return `${Math.round(days)} days ago`;
    } else if (hours > 1) {
      return `${Math.round(hours)} hours ago`;
    } else if (minutes > 1) {
      return `${Math.round(minutes)} minutes ago`;
    } else {
      return `${Math.round(seconds)} seconds ago`;
    }
  };

  const handleAnswersLike = (answerId) => {
    fetch(
      `https://anonymously.link/backend/api/gossip_ans_${
        upvoted ? "unvote" : "upvote"
      }/${answerId}/${userId}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpvoted(!upvoted);
        setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" border-[1px] w-[96%] border-gray-300 py-1 rounded-lg px-1 gap-2 self-end">
      <div className="flex gap-3 items-start">
      <div className="rounded-full overflow-hidden ml-2 h-[32px]">
        <img
          width={"36px"}
          height={"27px"}
          src={`https://4.240.73.133/upload/${answer.profile_pic}`}
          alt="fsdf"
        />
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="font-bold text-sm">{answer.username}</div>
          <div className="text-gray-500 text-sm">
            {timeAgo(answer.date_time)<0? "Just Now":timeAgo(answer.date_time)}
          </div>
        </div>
      </div>
      </div>
        <div className="py-1 text-left ml-3 text-sm ">{showMore ? answer.answer : answer.answer.slice(0, 100)}</div>
        <div
          onClick={() => setShowMore(!showMore)}
          className="text-gray-500 text-sm cursor-pointer ml-3"
        >
          {showMore ? "Show Less" : "Show More"}
        </div>

        <div className="flex gap-1 items-center text-gray-600 ml-3">
        <div
          onClick={() =>{!upvoted ? handleAnswersLike(answer.answer_id):{}}}
          className={` w-fit cursor-pointer `}
        >
          <div className="text-xl cursor-pointer">
            {upvoted ? <PiArrowFatUpFill /> : <PiArrowFatUpLight />}
          </div>
        </div>
        <div
          onClick={() => {upvoted ? handleAnswersLike(answer.answer_id):{}}}
          className="text-xl cursor-pointer"
        >
          {!upvoted ? <PiArrowFatDownFill /> : <PiArrowFatDownLight />}
        </div>
        <div>{upvotes}</div>
      </div>
      
    </div>
  );
};

export default Comment;
