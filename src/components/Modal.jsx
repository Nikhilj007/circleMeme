import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { TiFlag } from "react-icons/ti";
import { FaDotCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose }) => {
    const [show,setShow]=useState(false)
    useEffect(()=>{ 
        if(isOpen)setShow(false)
    }
    ,[isOpen])
  return (
    <>
      <div
        className={`fixed inset-0 z-50 w-full flex mt-16 justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute -top-10 right-[10%] z-50 ${
            isOpen ? "visible" : "invisible"
          }`}
          onClick={onClose}
        >
          <RxCross2 className="text-3xl " />
        </div>
        <div className="fixed inset-0  backdrop-filter backdrop-blur-sm w-full "></div>
        <div className="absolute bg-white p-3 rounded-md">
          <div className="w-full bg-gray-600 flex items-center  rounded-sm text-white p-4">
            <div className="text-2xl translate-y-1">
              <TiFlag />
            </div>
            <input
              className="w-full bg-transparent placeholder:text-white outline-none text-lg focus:outline-none"
              type="text"
              placeholder="Write your question here"
            />
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
