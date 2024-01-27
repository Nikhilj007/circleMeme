import React, { useState } from "react";
import EasyCrop from "./EasyCrop";

function Upload({img}) {
    

  return (
    <div className="App mt-12">
        <EasyCrop image={URL.createObjectURL(img)}  />
    </div>
  );
}

export default Upload;