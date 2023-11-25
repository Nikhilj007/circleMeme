import { Link } from "react-router-dom";
import Post from "./Post";
import PostNoImg from "./PostNoImg";
import { RiQuillPenFill } from "react-icons/ri";

function Home() {
  return (
    <div className="flex relative flex-col items-center pt-20 bg-gray-400 p-0">
      <PostNoImg />
      <Post />
      <Link to='/create' className="fixed text-lg bottom-4 right-2 sm:right-96 ">
        <button className="bg-blue-500 text-white rounded-full p-2">
            <RiQuillPenFill />
        </button>
      </Link>
    </div>
  );
}

export default Home;
