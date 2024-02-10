// import { MdCancelPresentation } from "react-icons/md";
import profile from "../assets/user-8.jpg";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

function CreatePost() {
  const { width } = useWindowDimensions();
  const imgFileRef = useRef(null);
  const videoFileRef = useRef(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [tag, setTag] = useState(false);
  const [type, setType] = useState();
  const [anonymous, setAnonymous] = useState();
  const [imgLink, setImgLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [modal,setModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const [loader,setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const [textOnly, setTextOnly] = useState(true);

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        `https://circle-backend-hw6e.onrender.com/api/self_profile/${userId}`
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setUserData(data[0]);
      console.log(data[0]);
    }
    if (!userData) {
      fetchdata();
    }
  }, []);

  const handleSubmit = () => {

    setLoader(true);
    setModal(false);
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("description", text);
    formData.append("anonymous", anonymous);
    formData.append("type", type);

    // Append the file (image or video)
    if (imgFileRef.current.files[0]) {
      formData.append("post", imgFileRef.current.files[0]);
    } else if (videoFileRef.current.files[0]) {
      formData.append("post", videoFileRef.current.files[0]);
    }
    console.log(formData);
    fetch(`https://circle-backend-hw6e.onrender.com/api/create_post`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setLoader(false);
      navigate(-1);
    })
    .catch((err) => console.log(err));
  };

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
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
        exit={{ opacity: 0, y: 100 }}
        style={{
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)", // Add a shadow at the top
        }}
        className="w-full top-3 relative max-w-lg rounded-3xl shadow-2xl bg-white p-4 text-lg mb-3"
      >
        <div className="flex items-center text-xl justify-between font-bold">
          <div onClick={handleCrossClick} className="text-2xl">
            <RxCross2 />
          </div>
          <div>Create New Post</div>
          <div  onClick={() => {loader?"":setTag(!tag)}} className="text-orange-600 ">
            {loader?<div className="loader absolute z-50 right-5 top-2"></div>:"Post"}
          </div>
        </div>
        <div className="flex text-sm pt-11 gap-4 items-center rounded-md pb-0 pr-0">
          <div className="rounded-full overflow-hidden  h-[40px]">
            <img width={"40px"} height={"40px"} src={`http://circle.net.in/upload/${userData?.profile_image}`} alt="" />
          </div>
          <div className="text-lg font-semibold">{userData?.username}</div>
        </div>
       <textarea
          id="post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none resize-none mt-1"
          placeholder="What's on your mind?"
          cols={width > 570 ? "60" : `30`}
          rows={textOnly?'5':'2'}
        ></textarea>
        <input
          onChange={(e) => {
            setTextOnly(false);
            setImgLink(URL.createObjectURL(e.target.files[0]));
            setVideoLink("");
          }
          }
          id="img"
          type="file"
          ref={imgFileRef}
          style={{ display: "none" }}
        />
        <input
          onChange={(e) => {
            setTextOnly(false);
            setVideoLink(URL.createObjectURL(e.target.files[0]));
            setImgLink("");
          }}
          id="video"
          type="file"
          ref={videoFileRef}
          style={{ display: "none" }}
        />
        {imgLink && (
          <div className="flex justify-center">
            <img
              className="rounded-sm w-full " height={"200px"} width={"200px"} 
              src={imgLink}
              alt=""
            />
          </div>
        )}
        {videoLink && (
          <div className="flex justify-center">
            <video
              className="rounded-sm w-full " height={"200px"} width={"200px"}
              src={videoLink}
              alt=""
              controls
            />
          </div>
        )}
            
        <div className={`flex justify-start gap-6 px-2 ${(imgLink ||videoLink)?"mt-4":"mt-14"}  mb-10 text-xl`}>
          {/* <button onClick={() => setText("")}>
            <MdCancelPresentation />
          </button> */}
          <button
            onClick={() => {imgFileRef.current.click();}}
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
          {
            <motion.div
              className="fixed bottom-1 rounded-3xl text-sm font-semibold border-4 left-0 right-0 bg-white  p-3 pb-1"
              initial={{ opacity: 0, y: "100%" }}
              animate={tag ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: "100%" }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
            >
              
              <div
                onClick={() => {
                  setType(2);
                  setTag(!tag);
                  setModal(true);

                }}
                className="pb-1  cursor-pointer"
              >
                Share in both
              </div>
              <div
                onClick={() => {
                  setType(1);
                  setTag(!tag);
                  setModal(true);

                }}
                className="pb-1  cursor-pointer"
              >
                Share on explore
              </div>
              <div
                onClick={() => {
                  setType(0);
                  setTag(!tag);
                  setModal(true);
              
                }}
                className="pb-2  cursor-pointer"
              >
                Share on campus
              </div>
            </motion.div>
          }
        </div>
      </motion.div>
      {modal&&<div className="fixed top-16  right-0 w-fit h-full text-sm">
        <div onClick={() => {setAnonymous(1);handleSubmit()}} className="z-50 bg-white px-3 font-semibold rounded-sm py-1 border-2 cursor-pointer hover:bg-black hover:text-white transition-all flex items-center gap-3 justify-between duration-500">
          Anonymously
          <FaRegEyeSlash/>
        </div>
        <div onClick={() => {setAnonymous(0);handleSubmit()}} className="bg-white font-semibold px-3 rounded-sm py-1 border-2 cursor-pointer hover:bg-black hover:text-white flex items-center justify-between gap-3 transition-all duration-500 z-50">
          As yourself
          <IoEyeOutline/>
        </div>

        </div>}
    </>
  );
}

export default CreatePost;
