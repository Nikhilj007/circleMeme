// Crush.js

import React from "react";
import { RxCross2 } from "react-icons/rx";

function Crush({ index, crush, handleChange, handleDelete }) {
  return (
    <div className="m-2 bg-[#989898] relative rounded-lg p-3 pb-8">
      <div className="absolute top-3 text-lg right-3" onClick={() => handleDelete(index)}>
        <RxCross2 />
      </div>
      <div className="my-3 text-[#e62121] text-start">Crushing on 💖</div>
      <input
        type="text"
        className="focus:outline-none border-2 text-white mb-4 w-full placeholder:text-white block rounded-lg border-white bg-[#989898] px-5 py-3"
        placeholder="Name"
        value={crush.name}
        onChange={(e) => handleChange(index, 'name', e.target.value)}
      />
      <input
        type="text"
        className="focus:outline-none border-2 text-white block rounded-lg w-full placeholder:text-white border-white bg-[#989898] px-5 py-3"
        placeholder="Department (if you know)"
        value={crush.department}
        onChange={(e) => handleChange(index, 'department', e.target.value)}
      />
    </div>
  );
}

export default Crush;
