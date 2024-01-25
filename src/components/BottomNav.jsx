import { FaHome } from "react-icons/fa";
import { PiChatCircleTextBold } from "react-icons/pi";
import { FaCirclePlus } from "react-icons/fa6";import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BottomNav() {
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        async function fetchdata() {
          const res = await fetch(
            `https://circle-backend-hw6e.onrender.com/api/self_profile/2`
          ).catch((err) => console.log(err));
          const data = await res.json();
          console.log(data);
          setUserImage(`https://circle.net.in/upload/${data[0].profile_image}`);
        }
        if (!userImage) {
          fetchdata();
        }
      }, []);

    return ( 
        <div className="fixed max-w-lg bg-white text-3xl px-4 py-1 bottom-0 z-10 w-full flex">
        <Link to={'/'} className="w-1/2 flex justify-center items-center bg-white font-bold">
          <FaHome />
        </Link>
        <a href="https://circle.net.in/message.php" className="w-1/2 flex justify-center items-center bg-white font-bold">
          < PiChatCircleTextBold/>
        </a>
        <Link to={'/create'} className="w-1/2 text-2xl flex justify-center items-center bg-white font-bold">
          < FaCirclePlus/>
        </Link>
        <a href="https://circle.net.in/like&notification.php" className="w-1/2 flex text-4xl justify-center items-center bg-white font-bold">
          < IoIosNotifications/>
        </a>
        <Link to="/user" className="w-1/2 flex justify-center items-center bg-white font-bold">
          {userImage && <img className="w-8 h-8 rounded-full" src={userImage} alt="" />}
        </Link>
      </div>
     );
}

export default BottomNav;