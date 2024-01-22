import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";

const Modal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(true);
  const [question, setQuestion] = useState("");
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (isOpen) setShow(false);
  }, [isOpen]);
  return (
    <>
      <div
        className={`fixed inset-0 z-10 w-full flex mt-40 justify-center ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60  w-full  "
        ></div>
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
          <div className="flex justify-between">
            <div
              onClick={() => setShow(!show)}
              className="flex bg-black items-center gap-2 w-fit mt-4 px-4 py-2 rounded-sm"
            >
              <div className="text-white text-sm">Ask as yourself</div>
            </div>
            <div
              onClick={() => setShow(!show)}
              className="flex bg-black items-center gap-2 w-fit mt-4 px-4 py-2 rounded-sm"
            >
              <div className="text-white text-sm">Ask anonymously</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
