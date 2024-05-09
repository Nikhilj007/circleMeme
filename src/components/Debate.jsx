import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Debate() {
  const img = localStorage.getItem("profile_image");
  const [debate, setDebate] = useState(true); 
  const navigate = useNavigate();
  const debateId = window.location.href.split("/").pop();
  const [answers, setAnswers] = useState([]);
  const [debateData, setDebateData] = useState(null);
  const userId = localStorage.getItem("userId");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [show, setShow] = useState(false);
  const ref = useRef();
  const queref = useRef(null);
  const [height, setHeight] = useState(0);
  let anonymous =0;
  const [questionHeight, setQuestionHeight] = useState(0);

  const handleOverlayClick = () => {
    setShow(false);
  };

  const calculateQuestionHeight = () => {
    if (queref.current) {
      const height = queref.current.offsetHeight;
      setQuestionHeight(height);
    }
  };

  const handleSubmit = async () => {
    setShow(false);
    setMessage("");
    const body = new URLSearchParams({
      answer: message,
      anonymous: anonymous,
      type: messageType,
      user_id : userId,
      debate_id : debateId
    });
    const res = await fetch(
      `https://circle-backend-ewrpf36y4q-el.a.run.app/api/ans_gossip`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    ).catch((err) => console.log(err));
    const data = await res.json();
    setAnswers(data.answers);
  }

  
  useEffect(() => {
    calculateQuestionHeight();
    window.addEventListener("resize", calculateQuestionHeight);
    return () => window.removeEventListener("resize", calculateQuestionHeight);
  }, [debateData]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://circle-backend-ewrpf36y4q-el.a.run.app/api/debate/${debateId}`
      ).catch((err) => console.log(err));
      const data = await res.json();
      setAnswers(data.answers);
      setDebateData(data.debate);
      calculateHeight();
    }
    fetchData();
    setShow(true);
  }, []);
  
  return (
    <div className="w-full max-w-lg">
      {show && (
          <div
            className="fixed inset-0 z-30 bg-black opacity-60"
            onClick={handleOverlayClick}
          ></div>
        )}
      <motion.div ref={ref}
        className="fixed z-40 max-w-lg bottom-0 rounded-lg border-t-4 font-semibold left-0 lg:left-[30%] translate-x-1/2 mb-2 right-0 bg-white p-3"
        initial={{ opacity: 0, y: "100%" }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
      >
        <div onClick={()=>{anonymous=1; setShow(false)}} className=" cursor-pointer w-full rounded-md border hover:bg-slate-500 transform transition-all px-4  ">
          Join debate Anonymously
        </div>
        <div onClick={()=>{anonymous=0; setShow(false)}} className="cursor-pointer hover:bg-slate-500 transform transition-all w-full rounded-md px-4 mt-2 ">
          Join debate As Yourself
        </div>
      </motion.div>
      <div className="fixed top-0 w-full">
      <div className="flex justify-between w-full bg-white border-b max-w-lg  py-3 px-2">
        <IoArrowBack onClick={()=>navigate(-1)} className="text-2xl cursor-pointer" />
        <div className="text-lg font-bold">Invite Participants</div>
        <RiShareBoxLine className="text-2xl cursor-pointer" />
      </div>
      <div ref = {queref}
       className="text-start px-5 border-black mt-3 border rounded-lg mx-3 w-[94%] max-w-lg bg-white leading-6 text-lg  py-4">
        {debateData?.question} 
      </div>
      </div>
      <div className={`py-16 px-2 ${questionHeight} `} style={{ marginTop: `${questionHeight + 10}px` }}>
      {answers.map((answer,i) => (
        <div key={i} class={`flex pb-4 items-center space-x-2 ${answer.type=='for'?"flex-row-reverse space-x-reverse":""}`}>
        <Link to={`/description/${answer.user_id}`}>
        <img
          class="w-10 h-10 rounded-full "
          src={
            answer.anonymous == 0
              ? `https://circle.net.in/upload/${answer.profile_pic}`
              : "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
          }
          alt=""
        />
        </Link>
        <div class={` leading-5 ${answer.type=='for'?'bg-[#0096FF] text-white rounded-lg text-start':'border-l-2 border-blue-600   text-start'} max-w-[70%]  py-2 px-4`}>
           {answer.answer} Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ad saepe totam distinctio ullam officia laborum error commodi modi quas amet ut accusamus, dolores reiciendis dignissimos inventore voluptates alias explicabo, nostrum sint molestias fuga doloribus! Facere, et ipsam, placeat necessitatibus in esse optio tempore rem magnam accusantium tempora officiis sequi.
        </div>
      </div>
        ))}</div>
      <div className="fixed gap-3 flex bg-white px-3 bottom-8 w-full max-w-lg">
        {debate ? (<><div onClick={()=>{setDebate(false); setMessageType("for")}} className="border bg-[2C7CF] w-full py-2 hover:bg-slate-400 rounded-3xl transform border-slate-400 transition-all cursor-pointer">
          For the motion
        </div>
        <div onClick={()=>{setDebate(false); setMessageType("against")}} className="border bg-[2C7CF] w-full py-2 hover:bg-slate-400 rounded-3xl transform border-slate-400 transition-all cursor-pointer">
          Against the motion
        </div></>
        ) : (
          <div className="flex items-center w-full max-w-lg left-1/2 transform -translate-x-1/2 px-2 fixed bottom-2 bg-white ">
            <img class="w-8 h-8 rounded-full mt-1 ml-3 bg-gray-300" src={anonymous == 0
              ? `https://circle.net.in/upload/${img}`
              : "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"} alt="" />
            <input value={message} onChange={(e)=>setMessage(e.target.value)}
             className="w-full px-6 p-3 focus:outline-none" placeholder="write your point" type="text"/>
            <button onClick={()=>message!=""?handleSubmit():{}} className="bg-slate-200 hover:bg-slate-800 hover:text-white transform transition-all text-sm py-1 px-4  rounded-md"
            >Submit</button>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default Debate;
