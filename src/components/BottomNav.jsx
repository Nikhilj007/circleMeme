import { FaHome } from "react-icons/fa";
import { PiChatCircleTextBold } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BottomNav() {
  const profile_image = localStorage.getItem("profile_image");
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null); // [{},{}
  const [userImage, setUserImage] = useState(
    `https://circle.net.in/upload/${
      profile_image!==undefined ? profile_image : "defaultProfileImg.jpg"
    }`
  );

  setTimeout(() => {
      fetch(
        `https://circle-backend-hw6e.onrender.com/api/badge/${userId}`
      )
      .then((res) => res.json()
      .then((data) => setUserData(data[0]))
      .catch((err) => console.log(err)))

  }, 1000);

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        `https://circle-backend-hw6e.onrender.com/api/badge/${userId}`
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data[0].noti==0);
      setUserData(data[0]);
    }
    fetchdata();
  }
  ,[]);

  return (
    <div className="fixed max-w-lg bg-white text-3xl px-4 py-1 bottom-0 z-10 w-full flex">
      <Link
        to={"/"}
        className="w-1/2 flex justify-center items-center bg-white font-bold"
      >
        <FaHome />
      </Link>
      <a
        href="https://circle.net.in/message.php"
        className="w-1/2 relative flex justify-center items-center bg-white font-bold"
      >
        <PiChatCircleTextBold />
        <div className={`absolute ${userData?.msg==0 ?'hidden':""} top-0 right-[30%] w-4 h-4 bg-red-500 rounded-full`}></div>
      </a>
      <Link
        to={"/create"}
        className="w-1/2 text-2xl flex justify-center items-center bg-white font-bold"
      >
        <FaCirclePlus />
      </Link>
      <Link
        to="/notify"
        className="w-1/2 relative flex text-4xl justify-center items-center bg-white font-bold"
      >
        <IoIosNotifications />
        <div className={`absolute ${userData?.noti!==0? '':'hidden'} top-0 right-[30%] w-4 h-4 bg-red-500 rounded-full`}></div>
      </Link>
      <Link
        to="/user"
        className="w-1/2 flex justify-center items-center bg-white font-bold"
      >
        {userImage && (
          <img className="w-8 h-8 rounded-full" src={userImage} alt="" />
        )}
      </Link>
    </div>
  );
}

export default BottomNav;
