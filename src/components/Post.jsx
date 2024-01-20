/* eslint-disable react/prop-types */
import { useState } from "react";
import profile from "../assets/user-8.jpg";
import { MdComment } from "react-icons/md";
// import { IoMdSend } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";

function Post({ meme }) {
  // const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState(meme.like);
  const [likeCount, setLikeCount] = useState(meme.likes_count);
  const [comments, setComments] = useState([]); // [{},{}
  const [showComment, setShowComment] = useState(false);
  const [commentCount, setCommentCount] = useState(meme.comment_count);
  const [text, setText] = useState('');

  const postComment = () => { 
    const formData =new URLSearchParams({
      comment: text,
      post_id: meme.id,
      user_id: 2,
    });
    console.log(formData)
    fetch(`https://circle-backend-hw6e.onrender.com/api/comment_post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCommentCount(commentCount + 1);
      })
      .catch((err) => console.log(err));
  };
  

  const handleComment = () => {
    setShowComment(!showComment);
    fetch(`https://circle-backend-hw6e.onrender.com/api/commentsofpost/${meme.id}/2`
    ).then((res)=>res.json())
    .then((data)=>{setCommentCount(data.comments.length)
      setComments(data.comments)
      console.log(data.comments)
    })
    .catch((err)=>console.log(err))
  };

  const handleClicked = () => {
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/${
        like ? "dislike_post" : "like_post"
      }/${meme.id}/2`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        console.log(res);
        like?setLikeCount(likeCount - 1):setLikeCount(likeCount + 1);
        setLike(!like);
      })
      .catch((err) => console.log(err));
  };

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
    <>
      <div className="max-w-lg w-full rounded-lg bg-white text-lg px-0 shadow-lg  sm:p-5 mb-2">
        <div className="flex justify-between p-3 items-center mb-0">
          <div className="flex gap-3 items-center">
            <div className="rounded-full overflow-hidden h-[48px]">
              <img
                width={"48px"}
                height={"36px"}
                src={`https://circle.net.in/upload/${meme.profile_pic}`}
                alt="fsdf"
              />
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
          <img
            className="rounded-sm w-full "
            src={`https://circle.net.in/posts/${meme.post}`}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between px-2 mr-5">
          <div className="flex px-2  gap-2">
            <div className="flex items-center gap-5">
              <div className="flex items-center mt-3">
                <button
                  onClick={handleClicked}
                  className="flex items-center gap-2"
                >
                  {like ? <div className="opacity-25 ">😂</div> : <div>😂</div>}
                  <span>{likeCount}</span>
                </button>
              </div>
              <div className="flex items-center mt-3">
                <button
                  onClick={handleComment }
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
            <img
              width={"30px"}
              height={"22px"}
              src={profile}
              loading="lazy"
              alt="fsdf"
            />
          </div>
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            className="outline-none "
            type="text"
            placeholder="write a comment"
          />
          <button onClick={postComment}>submit</button>
        </div>
        {showComment && <div>
          {comments.map((comment,idx)=>(
            <div key={idx} className="flex justify-start gap-4 p-6">
            <div className="rounded-full  overflow-hidden h-[30px]">
              <img
                width={"30px"}
                height={"22px"}
                src={profile}
                loading="lazy"
                alt="fsdf"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-500 text-sm">{comment.username}</div>
              <div className="text-sm">{timeAgo(comment.date_time)}</div>
              <div className="text-sm">{comment.comment}</div>
            </div>
          </div>
          ))}
          </div>}
      </div>
    </>
  );
}

export default Post;
