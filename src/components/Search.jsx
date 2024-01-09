import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import profile from "../assets/user-8.jpg"

function Search() {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const handlechange = (e) => {
    if(e.target.value==="St. Joseph's College, Darjeeling")setShowResults(true);
    else setShowResults(false);
  };

  return (
    <div className="p-2">
      <div className="fixed left-6 w-[97%] flex items-center border-2 border-black -ml-[1.15rem] px-1">
        <button onClick={() => navigate(-1)} className="text-3xl">
          <MdArrowBack />
        </button>
        <input
          onChange={(e)=>handlechange(e)}
          className="w-11/12 p-3 focus:outline-none"
          type="text"
          placeholder="search something"
        />
        <div>
          <FaSearch />
        </div>
      </div>
      {showResults && <Link to='/gossip' className=" text-left w-full flex items-center mt-20 gap-4 ">
        <div className="p-2 border-2 border-gray-300 rounded-full"> <MdOutlineLocationOn /></div>
        <div className="text-sm font-semibold flex justify-start flex-col">
            St. Joseph's College, Darjeeling
            <div className="text-gray-500 w-full">
            read more about college gossips, reviews, etc.
        </div>
        </div>
        
      </Link>
      }
      {showResults && <Link to='/gossip' className=" text-left w-full flex items-center mt-5 gap-4 ">
        <div className="border-2 border-gray-300 rounded-full"><div className="rounded-full overflow-hidden h-[48px]">
              <img width={"48px"} height={"36px"} src={profile} alt="fsdf" />
            </div></div>
        <div className="text-sm font-semibold flex justify-start flex-col">
            Rishabh Baptish
            <div className="text-gray-500 w-full">
            St. Joseph's College, Darjeeling
        </div>
        </div>
        
      </Link>}
    </div>
  );
}

export default Search;
