/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import profile from "../assets/user-8.jpg";
import { MdComment } from "react-icons/md";
// import { IoMdSend } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";


function Post({ meme,isCurrentUser }) {
  // const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState(meme.like);
  const [likeCount, setLikeCount] = useState(meme.likes_count);
  const [comments, setComments] = useState([]); // [{},{}
  const [showComment, setShowComment] = useState(false);
  const [commentCount, setCommentCount] = useState(meme.comment_count);
  const [text, setText] = useState("");
  const [showReport, setShowReport] = useState(false);
  const isImage = meme.post.split(".").pop() === "jpg";
  const [showMore, setShowMore] = useState(false);
  const desc= meme.description?meme.description:"";
  const reportRef = useRef(null);
  const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        async function fetchdata() {
          const res = await fetch(
            `https://circle-backend-hw6e.onrender.com/api/self_profile/2`
          ).catch((err) => console.log(err));
          const data = await res.json();
          setUserImage(`https://circle.net.in/upload/${data[0].profile_image}`);
        }
        if (!userImage) {
          fetchdata();
        }
      }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reportRef.current && !reportRef.current.contains(event.target) && !event.target.className.includes("threeDot")) {
        // Click occurred outside the report div, close it
        setShowReport(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deletePost = () => {
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/delete_post/${meme.id}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        // refresh the page
        window.location.reload();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const postComment = () => {
    if (text === "") {
      return;
    }
    const formData = new URLSearchParams({
      comment: text,
      post_id: meme.id,
      user_id: 2,
    });
    console.log(formData);
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
        setText("");
        handleComment();
      })
      .catch((err) => console.log(err));
  };

  const handleComment = () => {
    setShowComment(!showComment);
    if (showComment) {
      return;
    }
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/commentsofpost/${meme.id}/2`
    )
      .then((res) => res.json())
      .then((data) => {
        setCommentCount(data.comments.length);
        setComments(data.comments);
        console.log(data.comments);
      })
      .catch((err) => console.log(err));
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
        like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
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
      <div className="max-w-lg z-0 relative w-full rounded-lg bg-white text-lg px-0 shadow-lg  sm:p-5 mb-2">
        {showReport && (
          <div
            onClick={()=>{isCurrentUser && deletePost()}} 
           ref={reportRef} className="absolute top-2 right-1 bg-white rounded-lg shadow-lg p-2">
            {isCurrentUser?"Delete":"Report"}
          </div>
        )}

        <div className="flex justify-between p-3 items-center mb-0">
          <div className="flex gap-3 items-center">
            <div className="rounded-full overflow-hidden h-[48px]">
               <img 
                width={"48px"}
                height={"48px"} 
                src={`https://circle.net.in/upload/${meme.profile_pic}`}
                loading="lazy"
                alt="fsdf"
              />

            </div>
            <div className="text-start">
              <Link to={`/description/${meme.user_id}`} className="font-bold">{meme.username}</Link>
              <div className="text-gray-500">{timeAgo(meme.date_time)}</div>
            </div>
          </div>
          <div>
            <button
              onClick={() => {setShowReport(!showReport)}}
             className="text-gray-500 threeDot -mt-4 text-3xl">...</button>
          </div>
        </div>

        <div className="flex justify-center">
         {isImage ? (
            <img
              loading="lazy"
              className="rounded-sm w-full "
              src={`https://circle.net.in/posts/${meme.post}`}
              alt=""
            />
          ) : (
            <video
              className="rounded-sm w-full "
              src={`https://circle.net.in/posts/${meme.post}`}
              controls
            />
          )}
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
                  onClick={handleComment}
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
              <PiShareFat />
            </button>
          </div>
        </div>
        <div className="px-4 text-start text-sm mt-1"></div>
        <div className="px-4 text-start text-sm mt-1">
          {showMore ? desc : desc.substring(0, 50)}
          {desc.length>50 &&<button
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500"
          >
            {showMore ? "show less" : "show more"}
          </button>}
        </div>
        <div className="flex justify-start gap-4 p-6">
          <div className="rounded-full  overflow-hidden h-[30px] w-[43px]">
            <img
              width={"48px"}
              height={"30px"}
              src={userImage}
              loading="lazy"
              alt="fsdf"
            />
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="outline-none w-full "
            type="text"
            placeholder="write a comment"
          />
          <button className="text-end" onClick={postComment}>Post</button>
        </div>
        {showComment && (
          <div>
            {comments.map((comment, idx) => (
              <div key={idx} className="text-start pl-4 relative z-50">
                <div className="flex gap-3 ">
                  <Link to={`/description/${comment.user_id}`} className="rounded-full  overflow-hidden h-[32px] translate-y-1">
                  <img
                    width={"39px"}
                    height={"27px"}
                    src={`https://circle.net.in/upload/${comment.profile_pic}`}
                    loading="lazy"
                    alt="fsdf"
                  />
                </Link>
                <div className="rounded-xl bg-slate-200 w-full p-2 m-1 mr-2">
                  <div className="flex justify-between font-semibold gap-4 w-full items-center">
                    <div>
                      {comment.username}
                    </div>
                    <div className="text-sm">
                      {timeAgo(comment.date_time)}
                    </div>
                  </div>
                  <div className="text-gray-600">
                    {comment.comment}
                  </div>
                </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
