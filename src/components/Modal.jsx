import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimension";

const Modal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(true);
  const [question, setQuestion] = useState("");
  const { width } = useWindowDimensions();
  const [anonymous, setAnonymous] = useState();

  const postGossip = () => {
    if (question === "") {
      return;
    }
    const formData =new URLSearchParams({
      question: question,
      user_id: 2,
      anonymous: anonymous,
    });
    console.log(formData);
    fetch(`https://circle-backend-hw6e.onrender.com/api/new_gossip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString()
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onClose();
      })
      .catch((err) => console.log(err));
  }
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
              onClick={() => { setAnonymous(0); postGossip()}}
              className="flex bg-black items-center gap-2 w-fit mt-4 px-4 py-2 rounded-sm"
            >
              <div className="text-white text-sm">Ask as yourself</div>
            </div>
            <div
              onClick={() => {setAnonymous(1); postGossip()}}
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
