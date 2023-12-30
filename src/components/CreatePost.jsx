import { IoMdCreate, IoIosCloudDone } from "react-icons/io";
import { MdCancelPresentation } from "react-icons/md";
import profile from "../assets/user-8.jpg";
import { useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";

function CreatePost() {
  const { width } = useWindowDimensions();
  const imgFileRef = useRef(null);
  const videoFileRef = useRef(null);
  const [text, setText] = useState("");
  return (
    <>
      <div className="max-w-[24rem] fixed left-6 sm:left-[35%]  z-1 bg-white rounded-lg text-lg p-5 mb-3">
        <div className="flex justify-start items-center gap-3 font-bold text-gray-500">
          <IoMdCreate />
          Create Post
        </div>
        <div className="flex text-sm rounded-md p-1 pb-0 pr-0 gap-2">
          <div className="rounded-full overflow-hidden  h-[40px]">
            <img width={"40px"} height={"40px"} src={profile} alt="fsdf" />
          </div>
          <textarea
            id="post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="outline-none resize-none mt-1"
            placeholder="What's on your mind?"
            cols={width > 570 ? "60" : `${width / 11}`}
            rows="5"
          ></textarea>
        </div>
        <input id="img" type="file" ref={imgFileRef} style={{display:"none" }}/>
        <input id="video" type="file" ref={videoFileRef} style={{display:"none" }}/>
        <div className="flex justify-between px-2 text-2xl">
          <div  className="flex gap-3">
            <button onClick={() => setText("")}>
              <MdCancelPresentation />
            </button>
            <button onClick={()=>imgFileRef.current.click()} className="text-purple-800">
              <FaImage />
            </button>
            <button onClick={()=>videoFileRef.current.click()} className="text-blue-800">
              <FaVideo />
            </button>
          </div>
          <button>
            <IoIosCloudDone />
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
