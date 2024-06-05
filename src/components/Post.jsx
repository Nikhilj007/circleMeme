/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { MdComment } from "react-icons/md";
// import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { GoArrowUpRight } from "react-icons/go";
import Option from "./Option";

function Post({ meme, isCurrentUser }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const userId = localStorage.getItem("userId");
  const [like, setLike] = useState(meme?.like);
  const [likeCount, setLikeCount] = useState(meme?.likes_count);
  const [comments, setComments] = useState([]); // [{},{}
  const [showComment, setShowComment] = useState(false);
  const [commentCount, setCommentCount] = useState(meme?.comment_count);
  const [text, setText] = useState("");
  const [showReport, setShowReport] = useState(false);
  const noMedia = meme?.post === "null" || meme?.post === null;
  const [optionPercentage, setOptionPercentage] = useState({
    op1Percent: null,
    op2Percent: null,
  });
  const extension = meme?.post?.split(".").pop();
  const isImage =
    extension === "jpg" ||
    extension === "png" ||
    extension === "jpeg" ||
    extension === "gif" ||
    extension === "webp";
  const [showMore, setShowMore] = useState(false);
  const desc = meme?.description ? meme.description : "";
  const reportRef = useRef(null);
  const [userImage, setUserImage] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currEmoji, setCurrEmoji] = useState("👍🏽");
  const [showReportPopup, setShowReportPopup] = useState(false);
  const reportTimeoutRef = useRef(null);
  const type = meme?.type? meme.type: null;

  const handleReportClick = () => {
    // Show the report popup
    setShowReportPopup(true);

    // Set a timeout to hide the report popup after 2 seconds
    reportTimeoutRef.current = setTimeout(() => {
      setShowReportPopup(false);
    }, 2000);
  };

  const clearReportTimeout = () => {
    // Clear the timeout if the user dismisses the popup manually
    clearTimeout(reportTimeoutRef.current);
    setShowReportPopup(false);
  };

  const bind = useLongPress(() => {
    setShowEmoji(true);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (document.visibilityState === "visible" && document.hasFocus()) {
            videoRef.current.play();
            setIsPlaying(true);
          }
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        `https://anonymously.link/backend/api/self_profile/${userId}`
      ).catch((err) => console.log(err));
      const data = await res.json();
      setUserImage(`https://4.240.73.133/upload/${data[0]?.profile_image}`);
    }
    if (!userImage) {
      fetchdata();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reportRef.current &&
        !reportRef.current.contains(event.target) &&
        !event.target.className.includes("threeDot")
      ) {
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
      `https://anonymously.link/backend/api/delete_post/${meme.id}`,
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
    const formData = new URLSearchParams(type=='poll'?{
      comment: text,
      poll_id: meme?.id,
      user_id: userId,
    }:{
      comment: text,
      post_id: meme?.id,
      user_id: userId,
    });
    console.log(formData);
    fetch(`https://anonymously.link/backend/api/${type=='poll'?'pollComment_post':'comment_post'}`, {
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
      `https://anonymously.link/backend/api/${type=='poll'?'commentsofpoll':'commentsofpost'}/${meme?.id}/${userId}`
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
    if(type=='poll'){
      fetch(`https://anonymously.link/backend/api/poll_like/${userId}/${meme?.id}/${like?0:1}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLikeCount(data.likes);
        setLike(!like);
      })
    }
    fetch(
      `https://anonymously.link/backend/api/${
        like ? "dislike_post" : "like_post"
      }/${meme?.id}/${userId}`,
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

  const handleOption = (option) => {
    if(optionPercentage.op1Percent!=null) return;  
    fetch(
      `https://anonymously.link/backend/api/pollanswered/${userId}/${meme?.id}/${option}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOptionPercentage(data);
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
      <div className={`max-w-lg z-0 relative w-full rounded-lg bg-white text-lg px-0 shadow-lg  sm:p-5 ${type!='debate'?'':'pb-1'} mb-2`}>
        {/* report */}
      {showReportPopup && (
        <div className="absolute top-2 right-1 bg-white rounded-lg shadow-lg p-2" onClick={clearReportTimeout}>
          Your report will be examined.
        </div>
      )}
        {showReport && (
          <div
            onClick={() => {
              setShowReport(false);
              isCurrentUser && deletePost();
              !isCurrentUser && handleReportClick();
            }}
            ref={reportRef}
            className="absolute top-2 cursor-pointer right-1 bg-white rounded-lg shadow-lg p-2"
          >
            {isCurrentUser ? "Delete" : "Report"}
          </div>
        )}

        {/* top of post */}
        <div className="flex justify-between p-3 items-center mb-0">
          <div className="flex gap-3 items-center">
              <img
                className="rounded-full"
                width={"40px"}
                height={"40px"}
                src={`https://4.240.73.133/upload/${meme?.profile_pic}`}
                loading="lazy"
                alt="fsdf"
              />
            <div className="text-start">
              {meme?.username === "Anonymous" ? (
                <div className="font-bold text-sm">{meme?.username}</div>
              ) : (
                <Link
                  to={
                    meme?.user_id == userId
                      ? "/user"
                      : `/description/${meme?.user_id}`
                  }
                  className="font-bold text-sm"
                >
                  {meme?.username}
                </Link>
              )}
              <div className="text-gray-500 text-sm">{timeAgo(meme?.date_time)<0?"Just Now":timeAgo(meme?.date_time)}</div>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                setShowReport(!showReport);
              }}
              className="text-gray-500 threeDot -mt-4 text-3xl"
            >
              ...
            </button>
          </div>
        </div>
        
        {/* Main image/video/poll of the post */}
        {type!='debate'&&<div className="flex justify-center">
          {/* show play button if video is paused */}
          {videoRef.current && !noMedia && (
            <div
              className="absolute z-50 items-center justify-center w-full h-full
          bg-black bg-opacity-20 flex "
              style={{
                opacity: isPlaying ? 0 : 1,
                height: isPlaying ? '1px': "77.46%",
              }}
              onClick={() => {
                videoRef.current.play();
                setIsPlaying(true);
              }}
            >
              <button className=" rounded-full p-2">
                <svg
                
                  className="w-20 h-20 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </button>
            </div>
          )}

          {/* image / video */}
          {!noMedia && type==null && (
            <div>
              {isImage ? (
                <img
                  loading="lazy"
                  className="rounded-sm w-full "
                  src={`https://4.240.73.133/posts/${meme?.post}`}
                  alt=""
                />
              ) : (
                <video
                  onClick={() => {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  }}
                  ref={videoRef}
                  className="rounded-sm w-full "
                  src={`https://4.240.73.133/posts/${meme?.post}`}
                />
              )}
            </div>
          )}
          {type=='poll' &&( <div className="w-10/12">
            <div className="text-xl p-2 px-4 font-[400] text-start">{meme?.question}</div>
            <div className=" w-full text-start">
              <Option option={meme?.option1} optionPercentage={optionPercentage?.op1Percent} id='1' handleOption={handleOption} />
              <Option option={meme?.option2} optionPercentage={optionPercentage?.op2Percent} id='2' handleOption={handleOption} />
            </div>
          </div>)}
        </div>}

        {/* Debate */}
        {type=='debate'&&<div className="w-full max-w-lg pt-2 px-2">
          <div className="mb-2 text-left px-7 rounded-t-md py-2">{meme?.question}
          </div>
          <div class={`flex mb-2 items-center space-x-2 ${meme.ans_type=='for'?"flex-row-reverse space-x-reverse":""}`}>
        <img
          class="w-10 h-10 rounded-full bg-gray-300"
          src={
            meme.anonymous == 0
              ? `https://4.240.73.133/upload/${meme.ans_profile_pic}`
              : "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
          }
          alt=""
        />
        <div class="bg-gray-200 max-w-[70%] rounded-lg py-2 px-4">
           {meme.answer}
        </div>
      </div>
          <Link className="flex py-2 justify-between items-center px-4 rounded-md bg-slate-700 w-full text-white" to={'/debate/' + meme?.id}>
            <div></div>
            <div>Join Debate</div>
            <div className="text-2xl font-semibold"><GoArrowUpRight/></div>
            </Link>
        </div>}

        {/* Caption */}
        {type!='debate'&&<div className="px-4 -mb-1 text-start text-sm mt-1">
          {showMore ? desc : desc.substring(0, 300)}
          {desc.length > 300 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-500"
            >
              {showMore ? "show less" : "show more"}
            </button>
          )}
        </div>}


        {/* likes comments */}
        {type!='debate'&&<div className="flex items-center justify-between px-2 mr-5">
          <div className="flex px-2  gap-2">
            <div className="flex items-center gap-5">
              <div className="flex items-center mt-3">
                <button
                  //add the long press functionality
                  onClick={handleClicked}
                  {...bind({ threshold: 500 })}
                  className="flex items-center gap-2"
                >
                  {like ? (
                    <div className="opacity-25 ">{currEmoji}</div>
                  ) : (
                    <div>{currEmoji}</div>
                  )}
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
          {/* <div>
            <button className="flex items-center gap-2">
              <PiShareFat />
            </button>
          </div> */}
        </div>}
        {/* add comment section */}
        {type!='debate'&&<div className="flex justify-start gap-4 px-6 py-3 pb-4">
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
            className="outline-none  w-full "
            type="text"
            placeholder="write a comment"
          />
          <button className="text-end" onClick={postComment}>
            Post
          </button>
        </div>}
        {showComment && type!='debate' (
          <div>
            {comments.map((comment, idx) => (
              <div key={idx} className="text-start pl-4 relative z-50">
                <div className="flex gap-3 ">
                  <Link
                    to={`/description/${comment.user_id}`}
                    className="rounded-full  overflow-hidden h-[32px] translate-y-1"
                  >
                    <img
                      width={"39px"}
                      height={"27px"}
                      src={`https://4.240.73.133/upload/${comment.profile_pic}`}
                      loading="lazy"
                      alt="fsdf"
                    />
                  </Link>
                  <div className="rounded-xl bg-slate-200 w-full p-2 m-1 mr-2">
                    <div className="flex justify-between font-semibold gap-4 w-full items-center">
                      <div className="text-sm">{comment.username}</div>
                      <div className="text-xs">
                        {timeAgo(comment.date_time)}
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm">{comment.comment}</div>
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
