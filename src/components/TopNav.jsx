import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";

function TopNav() {
  const { width } = useWindowDimensions();
  const location = useLocation();
  const isMemesPage = location.pathname === "/";
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

  console.log(showExplore)
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
      <div
        className={
          `w-1/3 font-heebo ${showForyou?'z-10':''} cursor-pointer  ${
            width < 377 ? "-translate-x-8" : "-translate-x-16"
          } mt-2 max-[400px]:text-xl  flex justify-center items-center bg-white ` +
          (isForYouPage ? "border-b-2 border-orange-600 pb-[0.85rem]" : "pb-4")
        }
      >
        circle
        {showForyou && (
          <div className="absolute z-20 top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform -translate-x-1/2 -translate-y-5 left-1/2 rotate-45"></div>
              Scroll profiles of students from your campus and other
            </div>
          </div>
        )}
      </div>
      <div
        id="explore"
        className={
          `w-1/3 font-heebo ${showExplore?'z-10':''} flex cursor-pointer  ${
            width < 377 ? "-translate-x-6" : "-translate-x-16"
          } mt-2 max-[400px]:text-xl  justify-center text-[#808080] items-center bg-white ` +
          (isMemesPage ? "border-b-2 border-orange-600 pb-[0.85rem]" : "pb-4")
        }
      >
        explore
        {showExplore && (
          <div className="absolute z-20 top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform -translate-x-1/2 -translate-y-5 left-1/2 rotate-45"></div>
              Explore content from students across different campuses
            </div>
          </div>
        )}
      </div>
      <div
        className={
          `w-1/3 font-heebo ${showCampus?'z-10':''} cursor-pointer  ${
            width < 377 ? "-translate-x-2" : "-translate-x-14"
          } mt-2 max-[400px]:text-xl flex justify-center text-[#808080] items-center bg-white ` +
          (isCollegePage ? "border-b-2 border-orange-600 pb-[0.85rem]" : "pb-4")
        }
      >
        campus
        {showCampus && (
          <div className="absolute z-20 top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform -translate-x-1/2 -translate-y-5 left-1/2 rotate-45"></div>
              Stay informed and explore content from your campus
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => setSettings(!settings)}
        className={
          `w-1/4 flex text-xl cursor-pointer pb-1  justify-center items-center bg-white ${showGossip?'z-10':''} `
        }
      >
        <LuSettings2 />
        {showGossip && (
          <div className="absolute z-20 top-16 right-0 transform ">
            <div className="w-48 p-3 bg-white border border-gray-300 rounded-md shadow-md relative">
              <div className="absolute w-4 h-4 bg-white border-t-2 border-l-2 transform translate-x-4 -translate-y-5 left-1/2 rotate-45"></div>
              ask questions and gossip about your campus life
            </div>
          </div>
        )}
      </div>
      <div>
        <img
          className="translate-y-2"
          height={"60px"}
          width={"60px"}
          src="https://circle.net.in/assets/images/logot.png"
          alt=""
        />
      </div>
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
