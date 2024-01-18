import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { FaDotCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";

const Modal = ({ isOpen, onClose }) => {
    const [show,setShow]=useState(false)
    const [question,setQuestion]=useState('')
    const {width}=useWindowDimensions()
    useEffect(()=>{ 
        if(isOpen)setShow(false)
    }
    ,[isOpen])
  return (
    <>
      <div
        className={`fixed inset-0 z-10 w-full flex mt-16 justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute -top-10 right-[10%] ${
            isOpen ? "visible" : "invisible"
          }`}
          onClick={onClose}
        >
          <RxCross2 className="text-3xl " />
        </div>
        <div
          onClick={onClose}
         className="fixed inset-0 backdrop-blur-sm w-full  "></div>
        <div className="absolute bg-white p-3 rounded-md">
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
          <div onClick={()=>setShow(!show)} className="flex bg-black items-center gap-2 w-fit mt-4 px-4 py-2 rounded-sm">
            <div className="text-white text-sm">Ask a question</div>
          </div>
        </div>
        {show && <div className="relative w-9/12 h-fit p-7 bg-white top-32 text-start z-50">
          <div className="flex gap-4">
            <div className="text-2xl">
              <FaDotCircle />
            </div>
            Post anonymously
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">
              <FaDotCircle />
            </div>
            Post as yourself
          </div>
        </div>}
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
