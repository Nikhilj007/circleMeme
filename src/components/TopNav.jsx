import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import logo from "../assets/circleLogo.png";
import { motion } from "framer-motion";
import { useState } from "react";

function TopNav() {
  const location = useLocation();
  const isMemesPage = location.pathname === "/";
  const isCollegePage = location.pathname === "/college";
  const isForYouPage = location.pathname === "/foryou";
  const [settings, setSettings] = useState(false);
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    setSettings(false);
  };
  return (
    <div className="fixed max-w-lg ml-auto justify-around bg-white px-1 sm:px-4 py-2 -top-1 z-10 w-full flex shadow-md">
      {settings && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-60"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div
          onClick={() => navigate("/search")}
          className="text-2xl -translate-x-2 z-10 font-bold cursor-pointer"
        >
          <FaSearch />
        </div>{" "}
        <div className="-mt-1 -translate-x-[0.3rem]">circle</div>
      </div>
      <div
        onClick={() => {
          navigate("/foryou");
        }}
        className={
          "w-1/3 cursor-pointer -translate-x-2 pb-1 flex justify-center items-center bg-white " +
          (isForYouPage ? "border-b-4 border-gray-700" : "")
        }
      >
        For you
      </div>
      <div
        onClick={() => navigate("/")}
        id="explore"
        className={
          "w-1/3 flex cursor-pointer -translate-x-2 pb-1 justify-center items-center bg-white " +
          (isMemesPage ? "border-b-4 border-gray-700" : "")
        }
      >
        Explore
      </div>
      <div
        onClick={() => navigate("/college")}
        className={
          "w-1/3 cursor-pointer pb-1 -translate-x-2 flex justify-center items-center bg-white " +
          (isCollegePage ? "border-b-4 border-gray-700" : "")
        }
      >
        Campus
      </div>
      <div
        onClick={() => setSettings(!settings)}
        className={
          "w-1/4 flex text-2xl cursor-pointer pb-1 -mb-1 justify-center items-center bg-white "
        }
      >
        <LuSettings2 />
      </div>
      <div>
        <img height={"80px"} width={"80px"} src="https://circle.net.in/assets/images/logot.png" alt="" />
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
          <Link to={"/gossip"} className="">Campus Gossips</Link>
          <Link to ='/privacy' className="pb-1 block pt-1">Privacy and security</Link>
        </motion.div>
      }
    </div>
  );
}

export default TopNav;
