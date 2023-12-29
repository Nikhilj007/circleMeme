import { FaSearch } from "react-icons/fa";import { useLocation,useNavigate } from "react-router-dom";
import { LuSettings2 } from "react-icons/lu";
import logo from '../assets/circleLogo.png'

function TopNav() {
    const location= useLocation();
    const isMemesPage = location.pathname === "/memes";
    const isCollegePage = location.pathname === "/college";
    const isForYouPage = location.pathname === "/";
    const navigate = useNavigate();

    console.log(isMemesPage);
    return ( 
        <div className="fixed bg-white px-4 py-3 -top-1 z-10 w-full flex shadow-md">
      <div className="w-1/2 flex justify-center items-center bg-white">
         <div className="text-2xl font-bold cursor-pointer"><FaSearch/></div> circle
        </div>
        <div onClick={()=>{navigate('/')}} className={"w-1/3 cursor-pointer pb-1 flex justify-center items-center bg-white " + (isForYouPage ? "border-b-4 border-gray-700" : "")}>
          For you
        </div>
        <div onClick={()=>navigate('/memes')} className={"w-1/3 flex cursor-pointer pb-1 justify-center items-center bg-white " + (isMemesPage ? "border-b-4 border-gray-700" : "")}>
          Memes
        </div>
        <div onClick={()=>navigate('/college')} className={"w-1/3 cursor-pointer pb-1 flex justify-center items-center bg-white " + (isCollegePage ? "border-b-4 border-gray-700" : "")}>
          College
        </div>
        <div  className={"w-1/4 flex cursor-pointer pb-1 justify-center items-center bg-white "}>
          <LuSettings2/>
        </div>
        <div>
          <img height={"60px"} width={"60px"} src={logo} alt="" />
        </div>
      </div>
     );
}

export default TopNav;