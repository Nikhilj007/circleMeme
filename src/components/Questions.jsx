import { PiShareFat } from "react-icons/pi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PiArrowFatUpLight } from "react-icons/pi";
import { PiArrowFatUpFill } from "react-icons/pi";
import { PiArrowFatDownLight } from "react-icons/pi";
import { PiArrowFatDownFill } from "react-icons/pi";
import Comment from "./Comment";

function Question({ gossip }) {
  const [writeAnswer, setWriteAnswer] = useState(false);
  const [questionLikes, setQuestionLikes] = useState(gossip.upvotes);
  const [questionLiked, setQuestionLiked] = useState(gossip.upvoted);
  const [text, setText] = useState("");
  const [AnswersCount, setAnswersCount] = useState(gossip.no_of_answers);
  const [Answers, setAnswers] = useState([]); // [{},{}
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(gossip.answer_upvoted);
  const userId = localStorage.getItem("userId");
  const [answerUpvotes, setAnswerUpvotes] = useState(gossip.answer_upvotes);
  const [showMore, setShowMore] = useState(false);
  const [fullQuestion, setFullQuestion] = useState(false);


  const getAnswers = () => {
    setWriteAnswer(false);
    fetch(
      `https://circle-backend-ewrpf36y4q-el.a.run.app/api/gossip_get_answers/${gossip.id}/${userId}`
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
      `https://circle-backend-ewrpf36y4q-el.a.run.app/api/gossip_upvote/${gossip.id}/${userId}`,
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
      `https://circle-backend-ewrpf36y4q-el.a.run.app/api/gossip_unvote/${gossip.id}/${userId}`,
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

  const handleAnswerLike = () => {
    fetch(
      `https://circle-backend-ewrpf36y4q-el.a.run.app/api/gossip_ans_${
        isLiked ? "unvote" : "upvote"
      }/${gossip.answer_id}/${userId}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        isLiked ? setAnswerUpvotes(AnswersCount - 1) : setAnswerUpvotes(AnswersCount + 1);
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };

  const postAnswer = () => {
    if (text === "") {
      return;
    }
    console.log(gossip.id, text, 2);
    const formData = new URLSearchParams({
      answer: text,
      gossip_id: gossip.id,
      user_id: userId,
    });
    console.log(formData);
    fetch(`https://circle-backend-ewrpf36y4q-el.a.run.app/api/gossip_put_answer`, {
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
        //reload page
        window.location.reload();

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
                to={gossip.user_id==userId?"/user":`/description/${gossip.user_id}`}
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
                <div className="font-bold">{gossip.username}</div>
              ) : (
                <Link
                  to={gossip.user_id==userId?"/user":`/description/${gossip.user_id}`}
                  className="font-bold"
                >
                  {gossip.username}
                </Link>
              )}
            </div>
            <div className="text-gray-500">{timeAgo(gossip.date_time)<0? "Just Now":timeAgo(gossip.date_time)} </div>
          </div>
        </div>
      </div>
      <div className=" text-left w-fit ml-2">{fullQuestion ? gossip.question : gossip.question.slice(0, 300)}</div>
      {gossip.question.length > 300 && (
        <div

          onClick={() => setFullQuestion(!fullQuestion)}
          className="text-gray-500 text-start w-fit relative right-24 text-sm inline cursor-pointer ml-7"
        >
          {fullQuestion ? "Show Less" : "Show More"}
        </div>
      )}
      <div className="text-sm text-left ml-4 p-3 py-1 border-[1px] border-gray-300 rounded-md mt-2">
        {gossip.no_of_answers ? (
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
              {
                <Link
                  to={`/description/${gossip.answeredById}`}
                  className="font-bold"
                >
                  {gossip.answeredByName}
                </Link>
              }
            </div>
            <div className="text-gray-500">{timeAgo(gossip.answer_time)<0? "Just Now":timeAgo(gossip.answer_time)}</div>
          </div>
        ) : (
          ""
        )}
        <div className="ml-1 mt-1">
          {gossip.topAnswer ? showMore?gossip.topAnswer:gossip.topAnswer.slice(0, 300):"No Answers Yet"}
          {gossip.topAnswer && gossip.topAnswer.length > 300 && (
            <div
              onClick={() => setShowMore(!showMore)}
              className="text-gray-500 text-sm cursor-pointer ml-3"
            >
              {showMore ? "Show Less" : "Show More"}
            </div>
          )}
        </div>
        {gossip.no_of_answers ? (
          <div className="flex ml-1 text-gray-600 mt-2">
            <div
              onClick={!isLiked ?handleAnswerLike:null}
              className={` w-fit cursor-pointer `}
            >
              <div className="text-xl  cursor-pointer">
                {isLiked ? <PiArrowFatUpFill /> : <PiArrowFatUpLight />}
              </div>
            </div>
            <div
              onClick={isLiked ? handleAnswerLike:null}
             className="text-xl ml-1 cursor-pointer">
              {!isLiked ? <PiArrowFatDownFill /> : <PiArrowFatDownLight />}
            </div>
            <div className="ml-1">{answerUpvotes}</div>
          </div>
        ) : (
          ""
        )}
      </div>
      {showComments && (
        <div className="flex flex-col justify-end w-full gap-2 py-2">
          {Answers.slice(1).map((answer, idx) => (
            <Comment answer={answer} key={idx} />
          ))}
        </div>
      )}
      <div className="flex py-3 px-2 justify-between gap-6 items-center text-xl">
        <div className="flex justify-start gap-6 items-center text-xl">
          <div className="w-fit text-gray-600 gap-2 flex items-center cursor-pointer text-3xl">
            <div className="" onClick={!questionLiked ? handleLike:null}>
              {!questionLiked ? <PiArrowFatUpLight /> : <PiArrowFatUpFill />}
            </div>
            <div className="cursor-pointer" onClick={questionLiked ? handleunLike:null}>
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
            className=" border-[1px] text-base border-gray-300 px-3 rounded-md cursor-pointer relative gap-2 "
          >
            read answers
            <div className="text-[0.7rem] leading-[5px] absolute -top-[0.35rem] -right-[0.35rem] p-[0.3rem] bg-red-600 w-fit rounded-full  text-white">
              {AnswersCount}
            </div>
          </div>
        </div>
        {/* <div>
          <PiShareFat />
        </div> */}
      </div>


      
        <div className="flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full outline-none resize-none pl-3"
            placeholder="Write your answer here..."
            rows="2"
          ></textarea>
          <div className="flex justify-end gap-2">
            <div
              onClick={postAnswer}
              className="border-[1px] border-gray-500 rounded-lg cursor-pointer text-sm mb-2 px-3 py-1 "
            >
              Submit
            </div>
          </div>
        </div>
    </div>
  );
}

export default Question;
