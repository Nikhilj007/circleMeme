import { MdArrowBack } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate, useSearchParams,  } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Question from "./Questions";
import bgimage from "../assets/gossipsBackground.jpg";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";

function Gossips() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collge = searchParams.get("college");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gossips, setGossips] = useState(null); // [{},{}
  const [college,setCollege] = useState(collge?collge:""); // ""
  const userId = localStorage.getItem("userId");
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/foryou"),
    onSwipedRight: () => navigate("/college"),
    delta: 200
  });

  useEffect(() => {
    if (!userId || userId==="undefined") {
      window.location.href = "https://circle.net.in/signin.php";
    }

    if(college){
      return;
    }
    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-ewrpf36y4q-el.a.run.app/api/self_profile/"+userId
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
        "https://circle-backend-ewrpf36y4q-el.a.run.app/api/college_gossips/"+college+"/"+userId
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setGossips(data.posts);
    }
    async function fetchdata2() {
      const res = await fetch(
        "https://circle-backend-ewrpf36y4q-el.a.run.app/api/gossips"+"/"+userId)
      const data = await res.json();
      setGossips(data.posts);
    }
    if (!collge) {
    fetchdata2();
    }
    else {
      fetchdata();
    }
  }
  , []);

  return (
    <div {...handlers} className="bg-zinc-300 w-full mb-14">
      <div
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
      </div>
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
      </div>
      <div className="">
       {
          gossips && gossips.map((gossip)=>(
            <Question key={gossip.id} userId={userId} gossip={gossip}/>
          ))
       }
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} college={college} />

    </div>
  );
}

export default Gossips;
