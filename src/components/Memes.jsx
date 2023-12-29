import Post from "./Post";
import CreatePost from "./CreatePost";
import { IoAddCircleSharp } from "react-icons/io5";
import useComponentVisible from "../hooks/useComponentVisible";
import {useNavigate} from 'react-router-dom'

function Memes() {
  const navigate = useNavigate();
  return (
    <div className="flex relative pb-10 flex-col items-center pt-14 bg-[#ECF6FB] p-0">
      <Post />
      <Post />
      
      <div className="fixed text-lg bottom-14 right-2 sm:right-96">
        <button className=" text-blue-600 text-5xl rounded-full p-2">
          <IoAddCircleSharp onClick={() => navigate('/create')} />
        </button>
      </div>
      
    </div>
  );
}

export default Memes;
