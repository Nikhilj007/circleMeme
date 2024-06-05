import { FaAngleLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSendOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Picker from "@emoji-mart/react";
import useWindowDimensions from "../hooks/useWindowDimension";
import { io } from "socket.io-client";

function Chat() {
  const [show, setShow] = useState(false);
  const [soc, setSoc] = useState(null);
  const emojiref = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const columns = width < 330 ? 8 : width < 380 ? 9 : 10;
  const inputRef = useRef();
  const userId = localStorage.getItem("userId");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const img = localStorage.getItem("profile_image");
  //take id from url using window.location
  const senderId = localStorage.getItem("uniqueId");
  const receiverId = window.location.href.split("/").pop().split("?")[0];
  const [anonymous, setAnonymous] = useState(true);
  //get profile params from url
  const urlParams = new URLSearchParams(window.location.search);
  const profile = urlParams.get("profile");
  const handleOverlayClick = () => {
    setShow(false);
  };

  const handleOutsideEmojiClick = (e) => {
    if (emojiref.current && !emojiref.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  console.log(anonymous);

  const handleChatDelete = () => {
    fetch(
      `https://anonymously.link/backend/api/delete_chat/${senderId}/${receiverId}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/messages");
      });
  };

  const handleAnonymous = () => {
    fetch(
      `https://anonymously.link/backend/api/update_permission/${senderId}/${receiverId}/${
        anonymous == 1 ? 1 : 0
      }`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnonymous(anonymous == 1 ? 0 : 1);
      });
  };

  useEffect(() => {
    let socket = io("https://anonymously.link/backend/api/chat");
    setSoc(socket);
    socket.on("message", (data) => {
      console.log(data);
      if (senderId == data.receiverId && receiverId == data.senderId)
        setMessageList((prevMessageList) => {
          return {
            ...prevMessageList,
            chat: [...prevMessageList.chat, data],
          };
        });
    });

    fetch(
      `https://anonymously.link/backend/api/load_chat/${senderId}/${receiverId}/${
        profile == 1 ? 1 : 0
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessageList(data);
        setAnonymous(data.sender_anonymity);
      });
    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    //scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
  }, [messageList]);
  return (
    <div onClick={handleOutsideEmojiClick} className="w-full max-w-lg">
      <motion.div
        className={`fixed z-40 max-w-lg bottom-16 rounded-2xl font-semibold left-0 lg:left-[30.5%] translate-x-1/2 mb-2 right-0 bg-white ${
          show ? "block" : "hidden"
        } p-3`}
        initial={{ opacity: 0, y: 0 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
      >
        <div onClick={handleChatDelete} className="text-red-600 cursor-pointer">
          Delete Chat
        </div>
        <Link onClick={handleAnonymous} className="pb-1 block pt-1">
          {anonymous == 0 ? "Hide Profile" : "Show Profile"}
        </Link>
      </motion.div>
      <div className="flex justify-between items-center px-5 py-2 fixed shadow-md top-0 bg-white w-full max-w-lg">
        {show && (
          <div
            className="fixed inset-0 z-50 bg-black opacity-60"
            onClick={handleOverlayClick}
          ></div>
        )}
        <div className="flex items-center gap-3">
          <FaAngleLeft
            onClick={() => navigate(-1)}
            className="text-3xl cursor-pointer"
          />
          <Link
            className="relative flex items-center gap-3 z-10 cursor-pointer"
            to={`/description/${messageList?.id}`}
          >
            <img
              src={`https://4.240.73.133/upload/${messageList?.profile_pic}`}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-bold">{messageList?.username}</div>
            </div>
          </Link>
        </div>
        <div onClick={() => setShow(true)}>
          <BsThreeDotsVertical className="cursor-pointer text-3xl" />
        </div>
      </div>
      <div class="flex text-start relative mb-20 -z-10 px-2 mt-16 flex-col w-full max-w-lg space-y-4">
        {!userId ? (
          <div>
            You are not logged in,
            <Link className="text-blue-600"> Create Account</Link>
          </div>
        ) : null}
        {anonymous == 1 ? (
          <div className="py-5 text-center">You are chatting anonymously</div>
        ) : null}
        {messageList?.chat?.map((msg, i) => {
          if (msg.type == "sent")
            return (
              <div
                class="flex  flex-row-reverse items-center space-x-2 space-x-reverse"
                key={i}
              >
                <img
                  class="w-10 h-10 rounded-full bg-gray-300"
                  src={
                    anonymous == 0
                      ? `https://4.240.73.133/upload/${img}`
                      : "https://sandstormit.com/wp-content/uploads/2021/06/incognito-2231825_960_720-1.png"
                  }
                  alt=""
                />
                <div class="bg-gray-200 max-w-[70%] rounded-lg py-2 px-4">
                  {msg.msg}
                </div>
              </div>
            );
          else
            return (
              <div class="flex items-center space-x-2" key={i}>
                <Link
                  className="relative z-10 cursor-pointer"
                  to={`/description/${messageList?.id}`}
                >
                  <img
                    class="w-10 cursor-pointer h-10 rounded-full bg-gray-300"
                    src={`https://4.240.73.133/upload/${messageList?.profile_pic}`}
                    alt=""
                  />
                </Link>
                <div class="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%] text-start">
                  {msg.msg}
                </div>
              </div>
            );
        })}
      </div>
      <div className="flex fixed z-10 bottom-4 mx-1 w-full items-center max-w-lg">
        {/* <IoMdAttach className="text-3xl cursor-pointer" /> */}

        <div className="px-4 mx-2 py-2  sm:w-full w-[95%] bg-gray-200  border border-gray-500 rounded-full items-center flex gap-2 ">
          <MdOutlineEmojiEmotions
            onClick={() => {
              if (inputRef.current && inputRef.current.focus) {
                inputRef.current.blur();
              }
              setShowEmojiPicker(!showEmojiPicker);
              if (showEmojiPicker) {
                inputRef.current.focus();
              }
            }}
            className="text-3xl cursor-pointer"
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={inputRef}
            className="w-full relative z-50 bg-gray-200 placeholder:text-black focus:outline-none"
            type="text"
            placeholder="Write your message"
          />
          <IoSendOutline
            onClick={() => {
              soc.emit("user-message", { senderId, receiverId, message });
              setMessage("");
              setMessageList((prevMessageList) => {
                return {
                  ...prevMessageList,
                  chat: [
                    ...prevMessageList.chat,
                    { msg: message, type: "sent" },
                  ],
                };
              });
            }}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>
      {showEmojiPicker && (
        <div className="fixed left-1/2 bottom-14 transform -translate-x-1/2 z-50">
          <Picker
            ref={emojiref}
            className="w-full"
            set="apple"
            perLine={columns}
            previewPosition={"none"}
            onEmojiSelect={(emoji) => {
              setMessage(message + emoji.native);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
