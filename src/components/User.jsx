import { useRef, useState } from "react";
import profile from "../assets/user-8.jpg";
import { MdArrowBack } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrFormEdit } from "react-icons/gr";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 

const User = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    about:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe, accusantium blanditiis sed numquam quas. Error expedita et dolore obcaecati autem deleniti reiciendis velit eius! ",
    college: "St. Joseph's College, Darjeeling",
    location: "Kolkata, India",
    department: "Master's of Communication and Journalism",
    email: "amryap@gmail.com",
  });
  const profileRef = useRef(null);
  const [img, setImg] = useState(null); 
  const [editAbout, setEditAbout] = useState(false);
  const [editCollege, setEditCollege] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [imgLink, setImgLink] = useState(null);
  console.log(imgLink);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

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
          <div onClick={()=>navigate(-1)} className="text-2xl">
            <MdArrowBack />
          </div>
          <div className="-translate-x-20">Amarya Paul</div>
          <div onClick={() => setShow(!show)} className="text-xl">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="h-96 overflow-hidden w-full bg-white">
          <img className=" w-full" src={img?img:profile} alt="" />
        </div>
        <div className="w-[97%] rounded-md mt-2 text-start p-4 bg-white mx-auto">
          <div className="font-bold flex justify-between items-center">
            About
            <div
              onClick={() => setEditAbout(!editAbout)}
              className="text-2xl border-[1px] border-black rounded-full p-1"
            >
              {editAbout ? <MdOutlineDownloadDone /> : <GrFormEdit />}
            </div>
          </div>
          {editAbout ? (
            <textarea
              type="text"
              id="about"
              cols={40}
              value={userData.about}
              onChange={(e) => handleChange(e)}
              className="border-[1px] border-black rounded-md p-1"
            />
          ) : (
            <div className="text-gray-500 text-sm">{userData.about}</div>
          )}
        </div>
        <div className="w-[97%] rounded-md mt-2 text-start flex flex-col gap-6 p-4 bg-white mx-auto">
          <div className="flex justify-start gap-3 items-center">
            <div className="text-3xl">
              <FiLock />
            </div>
            <div>
              <div className="font-bold ">College</div>
                <div className="text-gray-500 text-sm">{userData.college}</div>
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
            <div className="text-3xl">
              <IoLocationOutline />
            </div>
            {editLocation ? (
              <input
                type="text"
                id="location"
                value={userData.location}
                onChange={(e) => handleChange(e)}
                className="border-[1px] border-black rounded-md p-1"
              />
            ) : (
              <div className="font-bold ">{userData.location}</div>
            )}
            </div>
            <div
              onClick={() => setEditLocation(!editLocation)}
              className="text-2xl border-[1px] border-black rounded-full p-1"
            >
              {editLocation ? <MdOutlineDownloadDone /> : <GrFormEdit />}
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
            <div className="text-3xl">
              <IoEyeOutline />
            </div>
            <div>
              <div className="font-bold  w-full">Department</div>
              {editDepartment ? (
                <input
                  type="text"
                  id="department"
                  value={userData.department}
                  onChange={(e) => handleChange(e)}
                  className="border-[1px] border-black rounded-md p-1"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  {userData.department}
                </div>
              )}
            </div>
            </div>
            <div
              onClick={() => setEditDepartment(!editDepartment)}
              className="text-2xl border-[1px] border-black rounded-full p-1"
            >
              {editDepartment ? <MdOutlineDownloadDone /> : <GrFormEdit />}
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
            <div className="text-3xl">
              <GoPeople />
            </div>
            <div>
              {editEmail ? (
                <input
                  type="text"
                  id="email"
                  value={userData.email}
                  onChange={(e) => handleChange(e)}
                  className="border-[1px] border-black rounded-md p-1"
                />
              ) : (
                <div className="font-bold ">{userData.email}</div>
              )}
            </div>
            </div>
            <div
              onClick={() => setEditEmail(!editEmail)}
              className="text-2xl border-[1px] border-black rounded-full p-1"
            >
              {editEmail ? <MdOutlineDownloadDone /> : <GrFormEdit />}
            </div>
          </div>
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
          <div
            onClick={() => profileRef.current.click()}
            className="flex justify-center items-center gap-2"
          >Change Picture</div>
          <div>Follow</div>
          <div>Drop Message</div>
          <div>Send Crush</div>
        </motion.div>
        <input type="file" 
         onChange={(e) => 
          {
            setImg(URL.createObjectURL(e.target.files[0]));
            setImgLink(e.target.files[0]);
            navigate("/upload");
          }
        }
         ref={profileRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default User;
