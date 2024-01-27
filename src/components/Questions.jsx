import { AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { PiShareFat } from "react-icons/pi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiArrowFatUpLight } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownLight } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";

function Question({ gossip }) {
  const [writeAnswer, setWriteAnswer] = useState(false);
  const [questionLikes, setQuestionLikes] = useState(gossip.upvotes);
  const [questionLiked, setQuestionLiked] = useState(gossip.upvoted);
  const [text, setText] = useState("");
  const [AnswersCount, setAnswersCount] = useState(gossip.no_of_answers);
  const [Answers, setAnswers] = useState([]); // [{},{}
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(gossip.answer_upvoted);

  const getAnswers = () => {
    setWriteAnswer(false);
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/gossip_get_answers/${gossip.id}/2`
    )
      .then((res) => res.json())
      .then((data) => {
        setAnswersCount(data.answers.length);
        setAnswers(data.answers);
        setShowComments(!showComments);
        console.log(data.answers);
      })
      .catch((err) => console.log(err));
  };

  const handleLike = () => {
    if (questionLiked) {
      return;
    }
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/gossip_upvote/${gossip.id}/2`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestionLikes(questionLikes + 1);
        setQuestionLiked(true);
      })
      .catch((err) => console.log(err));
  };

  const handleunLike = () => {
    if (!questionLiked) {
      return;
    }
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/gossip_unvote/${gossip.id}/2`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestionLikes(questionLikes - 1);
        setQuestionLiked(false);
      })
      .catch((err) => console.log(err));
  };

  const handleAnswerLike = () => {};

  const postAnswer = () => {
    if (text === "") {
      return;
    }
    console.log(gossip.id, text, 2);
    const formData = new URLSearchParams({
      answer: text,
      gossip_id: gossip.id,
      user_id: 2,
    });
    console.log(formData);
    fetch(`https://circle-backend-hw6e.onrender.com/api/gossip_put_answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWriteAnswer(!writeAnswer);

        // setCommentCount(commentCount + 1);
        // setText("");
        // handleComment();
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
    <div className=" bg-white my-1 max-w-lg px-2 mx-auto">
      <div className="flex gap-2 items-center">
        <div className="flex justify-between p-3 items-center mb-0">
          <div className="flex gap-3 items-start">
            {gossip.anonymous ? (
              <div className="rounded-full overflow-hidden h-[36px]">
                <img
                  width={"36px"}
                  height={"27px"}
                  src={`http://circle.net.in/upload/${gossip.profile_pic}`}
                  alt="fsdf"
                />
              </div>
            ) : (
              <Link
                to={`/description/${gossip.user_id}`}
                className="rounded-full overflow-hidden h-[36px]"
              >
                <img
                  width={"36px"}
                  height={"27px"}
                  src={`http://circle.net.in/upload/${gossip.profile_pic}`}
                  alt="fsdf"
                />
              </Link>
            )}
            <div className="text-start">
              {gossip.anonymous ? (
                <div className="font-bold text-pink-600">{gossip.username}</div>
              ) : (
                <Link
                  to={`/description/${gossip.user_id}`}
                  className="font-bold text-pink-600"
                >
                  {gossip.username}
                </Link>
              )}
            </div>
              <div className="text-gray-500">{timeAgo(gossip.date_time)}</div>
          </div>
        </div>
      </div>
      <div className="text-xl font-bold text-left ml-2">{gossip.question}</div>
      <div className="text-sm text-left ml-4 p-3 py-1 border-[1px] border-gray-300 rounded-md">
      <div className="flex gap-3 items-start">
            
              <Link
                to={`/description/${gossip.answeredById}`}
                className="rounded-full overflow-hidden h-[36px]"
              >
                <img
                  width={"36px"}
                  height={"27px"}
                  src={`http://circle.net.in/upload/${gossip.answeredByPhoto}`}
                  alt="fsdf"
                />
              </Link>
            <div className="text-start">
              {gossip.anonymous ? (
                <div className="font-bold text-pink-600">{gossip.answeredByName}</div>
              ) : (
                <Link
                  to={`/description/${gossip.user_id}`}
                  className="font-bold text-pink-600"
                >
                  {gossip.username}
                </Link>
              )}
            </div>
              <div className="text-gray-500">{timeAgo(gossip.date_time)}</div>
          </div>
        <div className="ml-1">{gossip.topAnswer ? gossip.topAnswer : "No answers yet"}</div>
      <div className="flex ml-1">
      <div
        onClick={handleAnswerLike}
        className={` w-fit cursor-pointer `}
      >
        <div className="text-xl cursor-pointer">
          {isLiked ? <PiArrowFatUpFill /> : <PiArrowFatUpLight />}
        </div>

      </div>
        <div className="text-xl cursor-pointer">
          {!isLiked ? <PiArrowFatDownFill /> : <PiArrowFatDownLight />}
        </div>
      </div>
        </div>
      <div className="flex py-3 px-2 justify-between gap-6 items-center text-xl">
        <div className="flex justify-start gap-6 items-center text-xl">
          <div className="w-fit flex items-center cursor-pointer text-3xl">
            <div className="" onClick={handleLike}>
              {!questionLiked ? <PiArrowFatUpLight /> : <PiArrowFatUpFill />}
            </div>
            <div className="cursor-pointer" onClick={handleunLike}>
              {!questionLiked ? (
                <PiArrowFatDownFill />
              ) : (
                <PiArrowFatDownLight />
              )}
            </div>
            <div className="text-base font-semibold">{questionLikes}</div>
          </div>
          <div
            onClick={getAnswers}
            className=" border-[1px] border-gray-300 px-3 rounded-md cursor-pointer relative gap-2 font-semibold"
          >
            read answers
            <div className="text-[0.7rem] leading-[5px] absolute -top-[0.35rem] -right-[0.35rem] p-[0.3rem] bg-red-600 w-fit rounded-full  text-white">{AnswersCount}</div>
          </div>
        </div>
        <div>
          <PiShareFat />
        </div>
      </div>
          <div
            onClick={() => {
              setWriteAnswer(!writeAnswer);
              setShowComments(false);
            }}
            className="text-white cursor-pointer bg-black text-sm px-3 py-1 rounded-sm"
          >
            Answer
          </div>

      {showComments && (
        <div className="flex flex-col gap-2 py-2">
          {Answers.map((answer, idx) => (
            <div key={idx} className="flex  gap-2">
              <div className="rounded-full overflow-hidden ml-2 h-[32px]">
                <img
                  width={"36px"}
                  height={"27px"}
                  src={`http://circle.net.in/upload/${answer.profile_pic}`}
                  alt="fsdf"
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="font-bold text-pink-600">
                    {answer.username}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {timeAgo(answer.date_time)}
                  </div>
                </div>
                <div className="text-gray-500 py-1 text-left ">
                  {answer.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {writeAnswer && (
        <div className="flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full outline-none resize-none"
            placeholder="Write your answer here..."
            rows="3"
          ></textarea>
          <div className="flex justify-end gap-2">
            <div
              onClick={postAnswer}
              className="text-white cursor-pointer bg-black text-sm mb-2 px-3 py-1 rounded-sm"
            >
              Submit
            </div>
            <div
              onClick={() => {
                setWriteAnswer(!writeAnswer);
                setShowComments(false);
              }}
              className="text-white cursor-pointer bg-red-500 text-sm mb-2 px-3 py-1 rounded-sm"
            >
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
