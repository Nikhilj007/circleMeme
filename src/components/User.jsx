import { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { PiBooks } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrFormEdit } from "react-icons/gr";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import Post from "./Post";

const User = ({img,setImg}) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editAbout, setEditAbout] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [imgLink, setImgLink] = useState(null);
  const [posts,setPosts] = useState(null);
  const [allPosts,setAllPosts] = useState(false);
  const inputRef = useRef(null);
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    async function fetchdata() {
      //scroll to top
      window.scrollTo(0, 0);
      const res = await fetch(
        `https://circle-backend-hw6e.onrender.com/api/self_profile/${userId}`
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setUserData(data[0]);
      console.log(data[0]);
      setPosts(data);
      setImgLink(`https://circle.net.in/upload/${data[0].profile_image}`);
    }
    if (!userData) {
      fetchdata();
    }
  }, []);

  async function fetchAllPosts() {
    const res = await fetch(
      `https://circle-backend-hw6e.onrender.com/api/all_user_posts/${userId}`
    ).catch((err) => console.log(err));
    const data = await res.json();
    console.log(data);
    setPosts(data.posts);
    setAllPosts(true);
  }



  const handleChange = async (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
    const res = await fetch(
      `https://circle-backend-hw6e.onrender.com/api/edit_profile/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [e.target.id]: e.target.value }),
      }
    ).catch((err) => console.log(err));
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
      <div className={`w-full bg-red-100 pb-3  `}>
        <div className="flex text-lg bg-white p-3 justify-between font-semibold items-center">
          <div onClick={()=>navigate(-1)} className="text-2xl">
            <MdArrowBack />
          </div>
          <div className="-translate-x-20">{userData?.username}</div>
          <div onClick={() => setShow(!show)} className="text-xl">
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="h-96 overflow-hidden w-full bg-white">
          <img className=" w-full" src={imgLink} alt="" />
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
              id="user_about"
              cols={40}
              value={userData?.user_about}
              onChange={(e) => handleChange(e)}
              className="border-[1px] border-black rounded-md p-1"
            />
          ) : (
            <div className="text-gray-500 text-sm">{userData?.user_about || "Write about yourself"}</div>
          )}
        </div>
        <div className="w-[97%]  rounded-md mt-2 text-start flex flex-col gap-6 p-4 bg-white mx-auto">
          <div className="flex justify-start gap-3 items-center">
            <div className="text-2xl">
              <FiLock />
            </div>
            <div>
              <div className="font-bold ">College</div>
                <div className="text-gray-500 text-sm">{userData?.workplaceCollage}<span className="text-black font-semibold">({userData?.end_year} {"-"} {userData?.starting_year})</span></div>
            </div>
          </div>
          <div className="flex justify-between gap-3 items-center">
            <div className="flex gap-3">
            <div className="text-2xl">
              <IoLocationOutline />
            </div>
            {editLocation ? (
              <input
                type="text"
                id="cityTown"
                value={userData?.cityTown}
                onChange={(e) => handleChange(e)}
                className="border-[1px] border-black rounded-md p-1"
              />
            ) : (
              <div className="">{userData?.cityTown || "Write your City/Town"}</div>
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
            <div className="text-2xl translate-y-2">
              <PiBooks />
            </div>
            <div>
              <div className="font-bold  w-full">Department</div>
              {editDepartment ? (
                <input
                  type="text"
                  id="department"
                  value={userData?.department}
                  onChange={(e) => handleChange(e)}
                  className="border-[1px] border-black rounded-md p-1"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  {userData?.department || "Write your Department"}
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
            <div className="text-2xl">
              <HiOutlineMailOpen />
            </div>
            <div>
              {editEmail ? (
                <input
                  type="text"
                  id="user_email"
                  value={userData?.user_email}
                  onChange={(e) => handleChange(e)}
                  className="border-[1px] border-black rounded-md p-1"
                />
              ) : (
                <div className=" ">{userData?.user_email || "Write your Email"}</div>
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
          className="w-full hover:cursor-pointer text-center font-semibold  fixed bottom-0 rounded-lg max-w-lg bg-white mb-12 pb-2 pt-3"
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
            onClick={() => inputRef.current.click()}
            className="flex justify-center items-center pb-1 gap-2"
          >Change Picture</div>
          <div>Log out</div>
        </motion.div>
      </div>
      <div className="text-lg flex justify-center border-b-[1px] border-gray-200 pb-3  mb-4 pt-2">
        <div className="border-[1px] border-gray-400 text-gray-500 rounded-lg px-3 py-1">Your Posts</div>
      </div>
      {
        !allPosts && posts && posts.map((post,id)=>(
            id>0 &&<Post key={post.id} meme={post} isCurrentUser={true}/>
        ))
      }
      {
        !allPosts && <div onClick={fetchAllPosts} className="bg-gray-200 hover:bg-gray-800 hover:text-white transition-all duration-300 text-lg py-3 mb-4 cursor-pointer flex justify-center">
          <div>See All Posts</div>
        </div>
      }
      {
        allPosts && posts && posts.map((post)=>(
          <Post key={post.id} meme={post} isCurrentUser={true}/> 
        ))
      }
      <input type="file"
      ref={inputRef}
      onChange={(e)=>{setImg(e.target.files[0]);navigate('/upload')}}
      style={{display:'none'}}
      accept="img/*"
       />
    </div>
  );
};

export default User;
