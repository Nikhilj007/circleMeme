import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

let type = 0;

function CreatePost() {
  const { width } = useWindowDimensions();
  const imgFileRef = useRef(null);
  const videoFileRef = useRef(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [tag, setTag] = useState(false);
  const [imgLink, setImgLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const userId = localStorage.getItem("userId");
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState(null);
  const [textOnly, setTextOnly] = useState(true);
  const [anonmymous, setAnonmymous] = useState(0);
  const [question, setQuestion] = useState(false);
  const [options, setOptions] = useState([{ option: "" }, { option: "" }]);
  const [description, setDescription] = useState("");
  const [ques, setQues] = useState("");
  let [cp, setCp] = useState(0);
  const [debate, setDebate] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        `https://anonymously.link/backend/api/self_profile/${userId}`
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

  const handleSubmit = (anony) => {
    if (debate) {
      if (ques == "") {
        alert("Please fill all the fields");
        return;
      }
      setLoader(true);
      const formData = new URLSearchParams();
      formData.append("user_id", userId);
      formData.append("type", type);
      formData.append("anonymous", anony);
      formData.append("question", ques);
      fetch(`https://anonymously.link/backend/api/new_debate`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoader(false);
          navigate("/");
        })
        .catch((err) => console.log(err));

      return;
    }
    if (cp == 1) {
      if (ques == "" || options[0].option == "" || options[1].option == "") {
        alert("Please fill all the fields");
        return;
      }
      setLoader(true);
      const formData = new URLSearchParams();
      formData.append("user_id", userId);
      formData.append("description", description);
      formData.append("anonymous", anony);
      formData.append("question", ques);
      formData.append("option1", options[0].option);
      formData.append("option2", options[1].option);

      fetch(`https://anonymously.link/backend/api/new_poll`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoader(false);
          navigate("/");
        })
        .catch((err) => console.log(err));

      return;
    }

    setLoader(true);
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("description", text);
    formData.append("anonymous", anony);
    formData.append("type", type);
    console.log(anony);
    // Append the file (image or video)
    if (imgFileRef.current.files[0]) {
      formData.append("post", imgFileRef.current.files[0]);
    } else if (videoFileRef.current.files[0]) {
      formData.append("post", videoFileRef.current.files[0]);
    }
    console.log(formData);
    fetch(`https://anonymously.link/backend/api/create_post`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoader(false);
        navigate("/");
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
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
        }}
        className="w-full top-3 relative max-w-lg rounded-3xl shadow-2xl bg-white p-4 text-lg mb-3"
      >
        <div className="flex items-center text-xl justify-between font-bold">
          <div onClick={handleCrossClick} className="text-2xl cursor-pointer">
            <RxCross2 />
          </div>
          <div>Create New Post</div>
          <div
            onClick={() => {
              if (cp == 1) handleSubmit(anonmymous);
              else loader ? "" : setTag(!tag);
            }}
            className="text-orange-600 cursor-pointer "
          >
            {loader ? (
              <div className="loader absolute z-50 right-5 top-2"></div>
            ) : (
              "Post"
            )}
          </div>
        </div>
        <div className="flex text-sm pt-11 gap-4 items-center rounded-md pb-0 pr-0">
          <div className="rounded-full overflow-hidden  h-[40px]">
            <img
              width={"40px"}
              height={"40px"}
              src={`https://4.240.73.133/upload/${userData?.profile_image}`}
              alt=""
            />
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
          rows={textOnly ? "5" : "2"}
        ></textarea>
        <input
          onChange={(e) => {
            setTextOnly(false);
            setImgLink(URL.createObjectURL(e.target.files[0]));
            setVideoLink("");
          }}
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
              className="rounded-sm w-full "
              height={"200px"}
              width={"200px"}
              src={imgLink}
              alt=""
            />
          </div>
        )}
        {videoLink && (
          <div className="flex justify-center">
            <video
              className="rounded-sm w-full "
              height={"200px"}
              width={"200px"}
              src={videoLink}
              alt=""
              controls
            />
          </div>
        )}

        <div
          className={`flex justify-start gap-6 px-2 ${
            imgLink || videoLink ? "mt-4" : "mt-14"
          } mb-3 text-xl`}
        >
          {/* <button onClick={() => setText("")}>
            <MdCancelPresentation />
          </button> */}
          <button
            onClick={() => {
              imgFileRef.current.click();
            }}
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
          <button
            className={`${
              anonmymous == 0 ? "" : "bg-gray-400"
            } px-3 border py-1 rounded-full text-base`}
            onClick={() => {
              anonmymous == 0 ? setAnonmymous(1) : setAnonmymous(0);
            }}
          >
            Post anonymously
          </button>
          <motion.div
            className="fixed z-50 bottom-1 rounded-3xl text-sm font-semibold border-4 left-0 right-0 bg-white  p-3 pb-1"
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
                type = 2;
                setTag(!tag);
                handleSubmit(anonmymous);
              }}
              className="pb-1  cursor-pointer"
            >
              Share on both
            </div>
            <div
              onClick={() => {
                type = 1;
                setTag(!tag);
                handleSubmit(anonmymous);
              }}
              className="pb-1  cursor-pointer"
            >
              Share on explore
            </div>
            <div
              onClick={() => {
                type = 0;
                setTag(!tag);
                handleSubmit(anonmymous);
              }}
              className="pb-2  cursor-pointer"
            >
              Share on campus
            </div>
          </motion.div>
        </div>
        {!question && (
          <div
            onClick={() => {
              setQuestion(true);
              setCp(1);
              setDebate(false);
            }}
            className={`rounded-full relative z-40 bg-gray-200 mx-3 font-heebo p-2 mt-1 cursor-pointer`}
          >
            <FaPlus className="inline -translate-y-[0.1rem]" /> Create Poll
          </div>
        )}
        <div
          onClick={() => {
            setQuestion(true);
            setCp(0);
            setDebate(true);
          }}
          className={`rounded-full relative z-40 ${
            question ? "hidden" : ""
          } bg-gray-200 mx-3 font-heebo p-2 mt-1 cursor-pointer`}
        >
          <FaPlus className="inline -translate-y-[0.1rem]" /> Create Debate
        </div>
        <motion.div
          className={`fixed bottom-1 ${
            question ? "z-0" : "-z-10"
          } rounded-3xl border w-full max-w-lg bg-white p-3 pb-1`}
          style={{
            translateX: "-50%",
            left: "50%",
            bottom: debate ? "9rem" : "1.5rem",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={question ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 12,
          }}
        >
          <div>
            <div className="flex items-center m-2">
              <input
                type="text"
                onChange={(e) => setQues(e.target.value)}
                placeholder="Write the topic for debate"
                className=" bg-gray-200 w-full text-start placeholder:text-black focus:outline-none rounded-md p-2 text-sm"
              />
              <RxCross2
                onClick={() => {
                  setQuestion(false);
                  setCp(0);
                }}
                className="inline mx-4 cursor-pointer text-3xl"
              />
            </div>
            {!debate && (
              <input
                type="text"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="focus:outline-none text-sm w-full mr-4 placeholder:text-black text-start p-2"
                placeholder="Add longer description"
              />
            )}
            {debate && (
              <div className="text-slate-700 text-left p-2 text-sm">
                Once you create a debate, you can share the link and invite friends or anyone to participate in the discussion.
              </div>
            )}
          </div>
          {!debate && (
            <div className="text-start font-semibold ml-2">Options</div>
          )}
          {!debate && (
            <div>
              {options.map((option, index) => {
                return (
                  <div key={index} className="flex items-center m-2">
                    <input
                      type="text"
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index].option = e.target.value;
                        setOptions(newOptions);
                      }}
                      placeholder={`Enter option ${index + 1}`}
                      className=" bg-gray-200 w-3/5 text-start placeholder:text-black focus:outline-none rounded-md p-2 text-sm"
                    />
                    {/* <RxCross2
                      onClick={() => {
                        const newOptions = options.filter(
                          (option, i) => i !== index
                        );
                        setOptions(newOptions);
                      }}
                      className="inline mx-4 cursor-pointer text-3xl"
                    /> */}
                  </div>
                );
              })}
            </div>
          )}
          {/* <div onClick={()=>setOptions([...options, {option: ""}])} className="bg-gray-200 rounded-full mx-2 font-semibold p-2 text-sm">+ option</div> */}
        </motion.div>
      </motion.div>
    </>
  );
}

export default CreatePost;
