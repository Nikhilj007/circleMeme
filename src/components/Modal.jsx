import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";

const Modal = ({ isOpen, onClose, college }) => {
  const [show, setShow] = useState(true);
  const [question, setQuestion] = useState("");
  const { width } = useWindowDimensions();
  const userId = localStorage.getItem("userId");
  const [loader,setLoader] = useState(false);

  const postGossip = (anonymous) => {
    if (question === "") {
      return;
    }
    setLoader(true);
    const formData =new URLSearchParams({
      question: question,
      user_id: userId,
      anonymous: anonymous,
      college: college
    });
    console.log(formData);
    fetch(`https://circle-backend-ewrpf36y4q-el.a.run.app/api/new_gossip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString()
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoader(false);
        window.location.reload();
        onClose();
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (isOpen) setShow(false);
  }, [isOpen]);
  return (
    <>
      {loader?<div className="relative top-1/2"><div className="loader"></div></div>:<div
        className={`fixed inset-0 z-10 w-full flex mt-20 justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60  w-full  "
        ></div>
        <div className="absolute bg-white p-3 rounded-md">
            <div>You are asking question in <span className="text-red-500">{college}</span> </div>
          <div className="w-full bg-gray-600 flex items-center  rounded-sm text-white p-4">
            <textarea
              className="w-full bg-transparent placeholder:text-white outline-none text-lg focus:outline-none"
              id="post"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Write your question here"
              cols={width > 570 ? "60" : `30`}
              rows="5"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <div
              onClick={() => { postGossip(0)}}
              className="flex border-[1px] ml-3 cursor-pointer border-gray-500  items-center gap-2 w-fit mt-4 px-4 py-2 rounded-lg"
            >
              <div className=" text-sm ">Ask as yourself</div>
            </div>
            <div
              onClick={() => { postGossip(1)}}
              className="flex cursor-pointer border-[1px] border-gray-500  items-center gap-2 w-fit mt-4 px-4 py-2 rounded-lg"
            >
              <div className=" text-sm">Ask anonymously</div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
