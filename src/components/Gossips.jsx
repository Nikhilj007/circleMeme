import { MdArrowBack } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Question from "./Questions";
import bgimage from "../assets/gossipsBackground.jpg";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function Gossips() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gossips, setGossips] = useState(null); // [{},{}
  const [college,setCollege] = useState(null); // ""

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-hw6e.onrender.com/api/self_profile/2"
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
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
    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-hw6e.onrender.com/api/gossips/2"
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setGossips(data.posts);
    }
    fetchdata();
  }
  , []);



  return (
    <div className="bg-zinc-300 w-full mb-14">
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
            <Question key={gossip.id} gossip={gossip}/>
          ))
       }
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />

    </div>
  );
}

export default Gossips;
