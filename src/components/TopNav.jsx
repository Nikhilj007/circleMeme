import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import { motion } from "framer-motion";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";

function TopNav() {
  const { width } = useWindowDimensions();
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
    <div className="fixed font-sans max-w-lg ml-auto justify-around bg-white px-1 sm:px-4 py-2 pb-0 -top-1 z-10 w-full flex shadow-md">
      {settings && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-60"
          onClick={handleOverlayClick}
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
        onClick={() => {
          navigate("/foryou");
        }}
        className={
          `w-1/3 font-heebo cursor-pointer  ${width<350?'-translate-x-10':'-translate-x-16'}   text-xl max-[360px]:text-lg mt-2  flex justify-center items-center bg-white ` +
          (isForYouPage ? "border-b-2 border-orange-600 pb-3" : "pb-4")
        }
      >
        circle
      </div>
      <div
        onClick={() => navigate("/")}
        id="explore"
        className={
          `w-1/3 font-heebo flex cursor-pointer  ${width<350?'-translate-x-8':'-translate-x-14'} text-xl mt-2  justify-center text-[#808080] items-center bg-white ` +
          (isMemesPage ? "border-b-2 border-orange-600 pb-3" : "pb-4")
        }
      >
        explore
      </div>
      <div
        onClick={() => navigate("/college")}
        className={
          `w-1/3 font-heebo cursor-pointer  ${width<350?'-translate-x-4':'-translate-x-10'} text-xl mt-2 flex justify-center text-[#808080] items-center bg-white ` +
          (isCollegePage ? "border-b-2 border-orange-600 pb-3" : "pb-4")
        }
      >
        campus
      </div>
      <div
        onClick={() => setSettings(!settings)}
        className={
          "w-1/4 flex text-xl cursor-pointer pb-1  justify-center items-center bg-white "
        }
      >
        <LuSettings2 />
      </div>
      <div>
        <img className="translate-y-2" height={"60px"} width={"60px"} src="https://circle.net.in/assets/images/logot.png" alt="" />
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
