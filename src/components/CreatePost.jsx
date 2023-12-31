// import { MdCancelPresentation } from "react-icons/md";
import profile from "../assets/user-8.jpg";
import { useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function CreatePost() {
  const { width } = useWindowDimensions();
  const imgFileRef = useRef(null);
  const videoFileRef = useRef(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [tag,setTag] = useState(false);

  const handleCrossClick = () => {
    setShouldAnimate(false); // Disable animation
    setTimeout(() => {
      navigate(-1);
    }, 300); 
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5,type:'spring',stiffness: 200,damping: 12 }}
        exit={{ opacity: 0, y: 100 }}
        style={{
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)", // Add a shadow at the top
        }}
        className="w-full top-3 relative max-w-lg rounded-3xl shadow-2xl bg-white p-4 text-lg mb-3"
      >
        <div className="flex items-center text-xl justify-between font-bold">
          <div
            onClick={handleCrossClick}
            className="text-2xl"
          >
            <RxCross2 />
          </div>
          <div>Create New Post</div>
          <div className="text-orange-600">Post</div>
        </div>
        <div className="flex text-sm pt-11 gap-4 items-center rounded-md pb-0 pr-0">
          <div className="rounded-full overflow-hidden  h-[40px]">
            <img width={"40px"} height={"40px"} src={profile} alt="fsdf" />
          </div>
          <div className="text-lg font-semibold">Sophia Doyle</div>
        </div>
        <textarea
          id="post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none resize-none mt-1"
          placeholder="What's on your mind?"
          cols={width > 570 ? "60" : `${width / 9}`}
          rows="5"
        ></textarea>
        <input
          id="img"
          type="file"
          ref={imgFileRef}
          style={{ display: "none" }}
        />
        <input
          id="video"
          type="file"
          ref={videoFileRef}
          style={{ display: "none" }}
        />
        <div className="flex justify-between px-2 text-xl">
          {/* <button onClick={() => setText("")}>
            <MdCancelPresentation />
          </button> */}
          <button
            onClick={() => imgFileRef.current.click()}
            className="text-purple-800 flex items-center gap-1"
          >
            <FaImage />
            <span className="text-base">Photo</span>
          </button>
          <button
            onClick={() => videoFileRef.current.click()}
            className="text-blue-800 flex items-center gap-1"
          >
            <FaVideo /> <span className="text-base">Video</span>
          </button>
          <button className="text-sm shadow-md">Post anonymously</button>
          <button  onClick={()=>setTag(!tag)} className="text-sm shadow-md">Add Tag</button>
          {tag &&<motion.div className="fixed bottom-0 rounded-3xl border-t-4 font-semibold left-0 right-0 bg-white p-3"
              initial={{ opacity: 0, y: '100%' }}
              animate={tag?{ opacity: 1, y: 0 }:{}}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.3,type:'spring',stiffness: 200,damping: 12 }}
            >
              <div className="pb-2 ">Sharing Moments</div>
              <div className="pb-2 ">Publishing Memes</div>
            </motion.div>}
        </div>
      </motion.div>
    </>
  );
}

export default CreatePost;
