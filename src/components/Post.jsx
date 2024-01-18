/* eslint-disable react/prop-types */
import { useState } from "react";
import profile from "../assets/user-8.jpg";
import { MdComment } from "react-icons/md";
// import { IoMdSend } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";

function Post({meme}) {
  // const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState(meme.like);
  const [likeCount, setLikeCount] = useState(meme.likes_count);
  const [showComment, setShowComment] = useState(false);
  const [commentCount, setCommentCount] = useState(meme.comment_count);

  function timeAgo(timeString) {
    const currentTime = new Date();
    const pastTime = new Date(timeString);
    const timeDifference = currentTime - pastTime;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  }

  return (
    <>
      <div className="max-w-lg rounded-lg bg-white text-lg px-0 shadow-lg  sm:p-5 mb-2">
        <div className="flex justify-between p-3 items-center mb-0">
          <div className="flex gap-3 items-center">
            <div className="rounded-full overflow-hidden h-[48px]">
              <img width={"48px"} height={"36px"} src={`https://circle.net.in/upload/${meme.profile_pic}`} alt="fsdf" />
            </div>
            <div className="text-start">
              <div className="font-bold">{meme.username}</div>
              <div className="text-gray-500">{timeAgo(meme.date_time)}</div>
            </div>
          </div>
          <div>
            <button className="text-gray-500 -mt-4 text-3xl">...</button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <img className="rounded-sm w-full " src={`https://circle.net.in/posts/${meme.post}`} alt="" />
        </div>
        <div className="flex items-center justify-between px-2 mr-5">
          <div className="flex px-2  gap-2">
            <div className="flex items-center gap-5">
              <div className="flex items-center mt-3">
                <button
                  onClick={() => {
                    setLike(!like);
                    like
                      ? setLikeCount(likeCount - 1)
                      : setLikeCount(likeCount + 1);
                  }}
                  className="flex items-center gap-2"
                >
                  {like ? <div className="opacity-25 ">😂</div> : <div>😂</div>}
                  <span>{likeCount}</span>
                </button>
              </div>
              <div className="flex items-center mt-3">
                <button
                  onClick={() => setShowComment(!showComment)}
                  className="flex items-center gap-2"
                >
                  <MdComment />
                  <span>{commentCount}</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <button className="flex items-center gap-2">
              <FaShareNodes />
            </button>
          </div>
        </div>
        {/* <div className="text-gray-400 px-4 text-start text-sm mb-2">
          {showMore ? text : text.substring(0, 150)}
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500"
          >
            {showMore ? "show less" : "show more"}
          </button>
        </div> */}
        <div className="flex justify-start gap-4 p-6">
          <div className="rounded-full  overflow-hidden h-[30px]">
            <img width={"30px"} height={"22px"} src={profile} loading="lazy" alt="fsdf" />
          </div>
          <input className="outline-none " type="text" placeholder="write a comment"/>
        </div>
        {showComment && (
          <div>
            nice
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
