import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProfileDescription = () => {
  const id = window.location.href.split("/").pop();
  console.log(id);
  const [currentUser, setCurrentUser] = useState();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        `https://circle-backend-hw6e.onrender.com/api/user_profile/${id}/2`
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setCurrentUser(data[0]);
    }
    if (!currentUser) {
      fetchdata();
    }
  }, []);

  const handleOverlayClick = () => {
    setShow(false);
  };

  return (
    <div className="relative w-full h-full bg-red-100 max-w-lg mb-14">
      {show && (
        <div
          className="fixed inset-0 bg-black opacity-60"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div className={`w-full  h-full mb-14 `}>
        <div className="flex text-lg bg-white p-3 justify-between font-semibold items-center">
          <div onClick={() => navigate(-1)} className="text-2xl">
            <MdArrowBack />
          </div>
          <div className="-ml-20">{currentUser?.username}</div>
          <div onClick={() => setShow(!show)} className="text-xl">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className=" overflow-hidden w-full bg-white">
          <img
            className=" w-full"
            src={`https://circle.net.in/upload/${currentUser?.profile_image}`}
            alt=""
          />
        </div>
        {currentUser?.user_about && (
          <div className="w-[97%] rounded-md mt-2 text-start p-4 bg-white mx-auto">
            <div className="font-bold flex justify-between items-center">
              About
            </div>
            <div className="text-gray-500 text-sm">
              {currentUser?.user_about}
            </div>
          </div>
        )}
        <div className="w-[97%]  rounded-md mt-2 text-start flex flex-col gap-6 p-4 bg-white mx-auto">
          <div className="flex justify-start gap-3 items-center">
            <div className="text-3xl">
              <FiLock />
            </div>
            <div>
              <div className="font-bold ">College</div>
              <div className="text-gray-500 text-sm">
                {currentUser?.workplaceCollage}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
              <div className="text-3xl">
                <IoLocationOutline />
              </div>

              <div className="font-bold ">{currentUser?.cityTown}</div>
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
              <div className="text-3xl">
                <IoEyeOutline />
              </div>
              <div>
                <div className="font-bold  w-full">Department</div>

                <div className="text-gray-500 text-sm">
                  {currentUser?.department
                    ? currentUser?.department
                    : "Not Specified"}
                </div>
              </div>
            </div>
          </div>
          { currentUser?.user_email &&
            <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
              <div className="text-3xl">
                <GoPeople />
              </div>
              <div>
                <div className="font-bold ">{currentUser?.user_email}</div>
              </div>
            </div>
          </div>
          }
        </div>
        <div className="fixed "></div>
        <motion.div
          className="w-full hover:cursor-pointer text-center text-blue-600 text-lg fixed bottom-0 rounded-lg max-w-lg bg-white mb-3 pb-10 pt-3"
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
          <div>{currentUser?.status}</div>
          <div>Drop Message</div>
          <div>Send Crush</div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileDescription;
