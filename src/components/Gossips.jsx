import { MdArrowBack } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate, useLocation,Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Question from "./Questions";
import bgimage from "../assets/gossipsBackground.jpg";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";
import { TbPlayerTrackNextFilled,TbPlayerTrackPrevFilled } from "react-icons/tb";

function Gossips() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gossips, setGossips] = useState(null); // [{},{}
  const [college,setCollege] = useState(""); // ""
  const userId = localStorage.getItem("userId");
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/foryou"),
    onSwipedRight: () => navigate("/college"),
    delta: 200
  });

  useEffect(() => {
    if (!userId || userId==="undefined") {
      window.location.href = "https://4.240.73.133/signin.php";
    }

    if(college){
      return;
    }
    async function fetchdata() {
      const res = await fetch(
        "https://anonymously.link/backend/api/self_profile/"+userId
      ).catch((err) => console.log(err));
      const data = await res.json();
      setCollege(data[0].workplaceCollage);
    }
    fetchdata();
  }, []);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchdata() {
      const res = await fetch(
        "https://anonymously.link/backend/api/college_gossips/"+college+"/"+userId
      ).catch((err) => console.log(err));
      const data = await res.json();
      setGossips(data.posts);
    }
    async function fetchdata2() {
      const res = await fetch(
        "https://anonymously.link/backend/api/allgossips"+"/"+userId)
      const data = await res.json();
      setGossips(data.posts);
    }
    if (!college || path=='/') {
    fetchdata2();
    }
    else {
      fetchdata();
    }
  }
  , [college,path]);

  return (
    <div {...handlers} className="bg-zinc-300 w-full mb-14">
      {path=='/gossip' &&<div
        to={"/search"}
        className="fixed z-50 bg-white left-6 w-[97%] max-w-lg lg:ml-[27.7%] flex items-center border-[1px] border-gray-300 -ml-[1.15rem] px-1"
      >
        <button onClick={() => navigate(-1)} className="text-3xl">
          <MdArrowBack />
        </button>
        <input
          onChange={() => navigate("/search")}
          className="w-11/12 p-3 focus:outline-none"
          type="text"
          value={college}
          placeholder="search something"
        />
        <div>
          <FaSearch />
        </div>
      </div>}
      <div className="mt-12 max-w-lg lg:left-[29.7%] relative">
        <img  src={bgimage} alt="" />
        <div className="absolute bottom-2 flex justify-around w-full">
          <div onClick={openModal} className="flex cursor-pointer bg-black items-center gap-2 px-4 py-2 rounded-lg">
            <div className="text-black  bg-white rounded-full text-lg">
              <BsQuestionCircle />
            </div>
            <div  className="text-white text-sm">Ask a question</div>
          </div>
        </div>
        {path=='/' &&<Link to='/gossip' className="absolute bottom-2 right-4">
          <TbPlayerTrackNextFilled className=" text-2xl" />
        </Link>}
        {path=='/gossip' &&<Link to='/' className="absolute bottom-2 left-4">
          <TbPlayerTrackPrevFilled className=" text-2xl" />
        </Link>}
      </div>
      <div className="">
       {
          gossips?.length==0?<div className="h-[60vh] px-3 text-start w-full max-w-lg flex justify-center items-center">Scoop! Be the first one to ask questions to the current enrolled students and alumni.</div>: gossips?.map((gossip)=>(
            <Question key={gossip.id} userId={userId} gossip={gossip}/>
          ))
       }
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} college={college} />

    </div>
  );
}

export default Gossips;
