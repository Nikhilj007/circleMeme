import { FaHome } from "react-icons/fa";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaCirclePlus } from "react-icons/fa6";import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function BottomNav() {
    return ( 
        <div className="fixed bg-white text-3xl px-4 py-3 bottom-0 z-10 w-full flex">
        <div className="w-1/2 flex justify-center items-center bg-white font-bold">
          <FaHome />
        </div>
        <div className="w-1/2 flex justify-center items-center bg-white font-bold">
          < BiSolidMessageRoundedDetail/>
        </div>
        <div className="w-1/2 text-2xl flex justify-center items-center bg-white font-bold">
          < FaCirclePlus/>
        </div>
        <div className="w-1/2 flex text-4xl justify-center items-center bg-white font-bold">
          < IoIosNotifications/>
        </div>
        <div className="w-1/2 flex justify-center items-center bg-white font-bold">
          < CgProfile/>
        </div>
      </div>
     );
}

export default BottomNav;