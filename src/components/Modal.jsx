import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="fixed inset-0  backdrop-filter backdrop-blur-sm "></div>
      <div className="absolute bg-white p-8 rounded-md">
        <div className="text-center">Krta hu thodi der me</div>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
