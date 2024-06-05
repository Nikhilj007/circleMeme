import { Link } from "react-router-dom";
import user from "../assets/user-8.jpg";
import msg from "../assets/message.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Messages() {
  const [chats, setChats] = useState([]); // [{}]
  //replace the space in the username with a hyphen
  const username = localStorage.getItem("username").replace(/\s/g, "-");
  const uniqueId = localStorage.getItem("uniqueId");

  const handleImageClick = () => {
    const textToCopy = 'https://anonymously.link/'+username+'/'+uniqueId;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Show a popup indicating that the link has been copied
        toast('🦄Link copied to clipboard');
        setTimeout(() => {
          setShowShare(false);
        }, 1900);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };
  const [showShare, setShowShare] = useState(false);
  useEffect(() => {
    fetch(
      "https://anonymously.link/backend/api/messages/" + uniqueId
    )
      .then((res) => res.json())
      .then((data) => {
        setChats(data.messages);
      });
  }, []);
  return (
    <div className="p-2 mt-1 w-full max-w-lg mb-10 min-h-0">
      <motion.div
        className={`fixed  ${
          showShare ? "z-50" : "-z-50"
        } max-w-lg top-24 rounded-2xl bg-transparent font-semibold left-0 lg:left-[30.5%] translate-x-1/2 mb-2 right-0${
          showShare ? "block" : "hidden"
        } p-3`}
        initial={{ opacity: 0, y: 0 }}
        animate={showShare ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
      >
        <div className={`relative rounded-3xl flex flex-col align-top justify-center content-center bg-white`}  >
          <img className="bg-transparent relative cursor-pointer" src={msg} />
          <div className="font-semibold text-start pl-7">Send anonymous messages, confession and chat.</div>
          <div className="text-gray-500 text-start pl-7">note: copy link & paste on your story</div>
          <div className="flex justify-center items-center">
          <div onClick={handleImageClick}
            className=" cursor-pointer mb-3 px-10 py-2 bg-black text-white p-1 text-center w-fit rounded-full"
          >
            Copy Link
          </div>
          </div>
        </div>
      </motion.div>
      {showShare && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-60"
          onClick={() =>{ setShowShare(false);
          }}
        ></div>
      )}
      <h1 className="text-start">Messages</h1>
      <div className="flex justify-center py-2 px-8">
        <div
          onClick={() => setShowShare(true)}
          className="text-white cursor-pointer text-bold text-center py-2 w-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
        >
          Share Link on your story
        </div>
      </div>
      <div>
        {chats?.map((chat, i) => (
          <Link
            key={i}
            to={`/chat/${chat.unique_id}`}
            className="flex py-6 border-b  items-center gap-7 p-2"
          >
            <img
              src={`https://4.240.73.133/upload/${chat.profile_pic}`}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-start">
              <div className="font-bold">{chat.username}</div>
              {/* trim message to 20 characters */}
              <div>{chat.msg.length > 30 ? chat.msg.slice(0, 30) + "..." : chat.msg}</div>
            </div>
          </Link>
        ))}
        
      </div>
      <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}

export default Messages;
