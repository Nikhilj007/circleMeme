import { useState } from "react";
import profile from "../assets/user-8.jpg";
import { MdArrowBack } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";

const User = () => {
  const [show, setShow] = useState(true);

  const handleOverlayClick = () => {
    setShow(false);
  };

  return (
    <div className="relative w-full max-w-lg mb-14">
      {show && (
        <div
          className="fixed inset-0 bg-black opacity-60"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div className={`w-full bg-red-100 mb-14 `}>
        <div className="flex text-lg bg-white p-3 justify-between font-semibold items-center">
          <div className="text-2xl">
            <MdArrowBack />
          </div>
          <div className="-translate-x-20" >Amarya Paul</div>
          <div onClick={()=>setShow(!show)} className="text-xl">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="h-96 w-full bg-white">
        <img className="h-96 w-full" src={profile} alt="" />
      </div>
      <div className="w-[97%] rounded-md mt-2 text-start p-4 bg-white mx-auto">
        <div className="font-bold">About</div>
        <div className="text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
          saepe, accusantium blanditiis sed numquam quas. Error expedita et
          dolore obcaecati autem deleniti reiciendis velit eius!
        </div>
      </div>
      <div className="w-[97%] rounded-md mt-2 text-start flex flex-col gap-6 p-4 bg-white mx-auto">
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <FiLock />
          </div>
          <div>
            <div className="font-bold ">College</div>
            <div className="text-gray-500 text-sm">
              St. {"Joseph's"} College, Darjeeling{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <IoLocationOutline />
          </div>
          <div>
            <div className="font-bold ">Kolkata, India</div>
          </div>
        </div>
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <IoEyeOutline />
          </div>
          <div>
            <div className="font-bold  w-full">Department</div>
            <div className="text-gray-500 text-sm">
              {"Master's"} of Communication and Journalism
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <GoPeople />
          </div>
          <div>
            <div className="font-bold ">amryap@gmail.com</div>
          </div>
        </div>
      </div>
        <div className="fixed "></div>
          <motion.div
           className="w-full text-center text-blue-600 text-lg fixed bottom-0 rounded-[2.5rem] bg-white mb-3 pb-10 pt-3"
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
            <div>Change Picture</div>
            <div>Follow</div>
            <div>Drop Message</div>
            <div>Send Crush</div>
          </motion.div>
      </div>
    </div>
  );
};

export default User;
