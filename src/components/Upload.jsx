import React, { useState } from "react";
import EasyCrop from "./EasyCrop";

function Upload({img}) {
  const userId = localStorage.getItem("userId");

  return (
    <div className="App mt-12">
        <EasyCrop userId={userId} image={URL.createObjectURL(img)}  />
    </div>
  );
}

export default Upload;