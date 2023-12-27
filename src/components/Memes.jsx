import Post from "./Post";
import CreatePost from "./CreatePost";
import { IoAddCircleSharp } from "react-icons/io5";
import useComponentVisible from "../hooks/useComponentVisible";


function Memes() {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <div className="flex relative pb-10 flex-col items-center pt-20 bg-[#ECF6FB] p-0">
      <Post />
      <Post />
      {isComponentVisible && (
        <div ref={ref}>
          <CreatePost />
        </div>
      )}
      <div className="fixed text-lg bottom-14 right-2 sm:right-96">
        <button className=" text-blue-600 text-5xl rounded-full p-2">
          <IoAddCircleSharp onClick={() => setIsComponentVisible(true)} />
        </button>
      </div>
      
    </div>
  );
}

export default Memes;
