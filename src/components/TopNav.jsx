import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import demo from '../assets/demo.png'

function TopNav() {
  const { width } = useWindowDimensions();
  const location = useLocation();
  const isMemesPage = location.pathname === "/meme";
  const isCollegePage = location.pathname === "/college";
  const isForYouPage = location.pathname === "/foryou";
  const [settings, setSettings] = useState(false);
  const navigate = useNavigate();
  const [showCampus, setShowCampus] = useState(false);
  const [showForyou, setShowForyou] = useState(false);
  const [showGossip, setShowGossip] = useState(false);
  const url = window.location.href;
  const [showExplore, setShowExplore] = useState(url.includes("?first"));
  const [urlHasFirst,seturlHasFirst] = useState(url.includes("?first"));
  const [showDemo, setShowDemo] = useState(false);
  const handletour = () => {
    if(showExplore){
      setShowExplore(false);
      setShowCampus(true);
      return;
    }
    if(showCampus){
      setShowCampus(false);
      setShowForyou(true);
      return;
    }
    if(showForyou){
      setShowForyou(false);
      setShowGossip(true);
      return;
    }
    if(showGossip){
      setShowGossip(false);
      setShowDemo(true);
      return;
    }
    if(showDemo){
      setShowDemo(false);
      seturlHasFirst(false);
    }
  }

  const handleOverlayClick = () => {
    setSettings(false);
  }

  return (
    <div className="fixed  font-sans max-w-lg ml-auto justify-around bg-white px-1 sm:px-4 py-2 pb-0 -top-1 z-10 w-full flex shadow-md">
      
      {(settings) && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-60"
          onClick={handleOverlayClick}
        ></div>
      )}
      {urlHasFirst && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-60"
          onClick={handletour}
        ></div>
      )}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div
          onClick={() => navigate("/search")}
          className="text-2xl -translate-y-1  -translate-x-6 z-10 font-bold cursor-pointer"
        >
          <FaSearch />
        </div>
      </div>
      <Link to='/foryou' 
        onClick={()=>navigate('/foryou')}
        className={
          `w-1/3 font-heebo ${showForyou?'z-10':''} ${urlHasFirst?'rounded-md':''} cursor-pointer  ${
            width < 377 ? "-translate-x-8" : "-translate-x-16"
          } mt-2 max-[400px]:text-xl  flex justify-center items-center bg-white ` +
          (isForYouPage ? "border-b-2 border-orange-600 pb-[0.85rem]" : "pb-4")
        }
      >
        circle
        {showForyou && (
          <div className="absolute z-20 top-14 left-1/2 ml-12 transform -translate-x-1/2">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform -translate-x-1/2 -translate-y-5 left-10 sm:left-1/2 rotate-45"></div>
              Scroll profiles of students from your campus and other
            </div>
          </div>
        )}
      </Link>
      <Link to='/meme'
        id="explore"
        className={
          `w-1/3 font-heebo ${showExplore?'z-10':''} ${urlHasFirst?'rounded-md':''} flex cursor-pointer  ${
            width < 377 ? "-translate-x-6" : "-translate-x-16"
          } mt-2 max-[400px]:text-xl  justify-center text-[#808080] items-center bg-white ` +
          (isMemesPage ? "border-b-2 border-orange-600 pb-[0.85rem]" : "pb-4")
        }
      >
        explore
        {showExplore && (
          <div className="absolute z-20 top-14 left-1/2 transform -translate-x-1/2">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform -translate-x-1/2 -translate-y-5 left-1/2 rotate-45"></div>
              Explore content from students across different campuses
            </div>
          </div>
        )}
      </Link>
      <Link to='/college'
        className={
          `w-1/3 font-heebo ${showCampus?'z-10':''} ${urlHasFirst?'rounded-md':''} cursor-pointer  ${
            width < 377 ? "-translate-x-2" : "-translate-x-14"
          } mt-2 max-[400px]:text-xl flex justify-center text-[#808080] items-center bg-white ` +
          (isCollegePage ? "border-b-2 border-orange-600 pb-[0.85rem]" : "pb-4")
        }
      >
        campus
        {showCampus && (
          <div className="absolute z-20 top-14 left-1/2 transform -translate-x-1/2">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform -translate-x-1/2 -translate-y-5 left-1/2 rotate-45"></div>
              Stay informed and explore content from your campus
            </div>
          </div>
        )}
      </Link>
      <div
        onClick={() => setSettings(!settings)}
        className={
          `w-1/4 flex text-xl cursor-pointer pb-1 rounded-md  justify-center items-center bg-white `
        }
      >
        <LuSettings2 />
        {showGossip && (
          <div className="absolute z-20 top-[4.5rem] right-0 transform ">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform translate-x-4 -translate-y-5 left-1/2 rotate-45"></div>
              ask questions and gossip about your campus life
            </div>
          </div>
        )}
      </div>
      <a href="https://youtu.be/8jg2a6xsxHE?si=036ENgY8I51EUYKB">
        <img
          className="translate-y-2 cursor-pointer"
          height={"60px"}
          width={"60px"}
          src="https://circle.net.in/assets/images/logot.png"
          alt=""
        />
        {showDemo && (
          <div className="absolute z-20 top-[4.5rem] right-0 transform ">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform translate-x-4 -translate-y-5 right-8 sm:right-10 rotate-45"></div>
              Watch demo video
              <img src={demo} alt="" />
            </div>
          </div>
        )}
      </a>
      {
        <motion.div
          className="fixed z-40 max-w-lg bottom-10 rounded-lg border-t-4 font-semibold left-0 lg:left-[30%] translate-x-1/2 mb-2 right-0 bg-white p-3"
          initial={{ opacity: 0, y: "100%" }}
          animate={settings ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: "100%" }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 12,
          }}
        >
          <Link to={"/gossip"} className="">
            Campus Gossips
          </Link>
          <Link to="/privacy" className="pb-1 block pt-1">
            Privacy and security
          </Link>
        </motion.div>
      }
    </div>
  );
}

export default TopNav;
