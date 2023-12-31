import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import logo from "../assets/circleLogo.png";
import { motion } from "framer-motion";
import { useState } from "react";

function TopNav() {
  const location = useLocation();
  const isMemesPage = location.pathname === "/memes";
  const isCollegePage = location.pathname === "/college";
  const isForYouPage = location.pathname === "/";
  const [settings, setSettings] = useState(false);
  const [search,setSearch] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="fixed max-w-lg ml-auto bg-white px-4 py-3 -top-1 z-10 w-full flex shadow-md">
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div onClick={() => setSearch(!search)} className="text-2xl z-10 font-bold cursor-pointer">
          <FaSearch  />
        </div>{" "}
        circle
      </div>
      <div
        onClick={() => {
          navigate("/");
        }}
        className={
          "w-1/3 cursor-pointer pb-1 flex justify-center items-center bg-white " +
          (isForYouPage ? "border-b-4 border-gray-700" : "")
        }
      >
        For you
      </div>
      <div
        onClick={() => navigate("/memes")}
        className={
          "w-1/3 flex cursor-pointer pb-1 justify-center items-center bg-white " +
          (isMemesPage ? "border-b-4 border-gray-700" : "")
        }
      >
        Memes
      </div>
      <div
        onClick={() => navigate("/college")}
        className={
          "w-1/3 cursor-pointer pb-1 flex justify-center items-center bg-white " +
          (isCollegePage ? "border-b-4 border-gray-700" : "")
        }
      >
        College
      </div>
      <div
        onClick={() => setSettings(!settings)}
        className={
          "w-1/4 flex cursor-pointer pb-1 justify-center items-center bg-white "
        }
      >
        <LuSettings2 />
      </div>
      <div>
        <img height={"60px"} width={"60px"} src={logo} alt="" />
      </div>
      {
        <motion.div
          className="fixed z-40 bottom-10 rounded-3xl border-t-4 font-semibold left-0 right-0 bg-white p-3"
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
          <div className="pb-2 border-b-2 ">logout</div>
          <div className="pb-2 border-b-2 ">Settings</div>
          <div className="pb-2 ">Gig work</div>
        </motion.div>
      }
      {search &&<div className="fixed left-6 w-full ">
        <input className="w-10/12 p-2" type="text" placeholder="search something" />
      </div>}
    </div>
  );
}

export default TopNav;
