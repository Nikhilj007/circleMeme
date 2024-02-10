import React, { useState } from "react";
import { MdArrowBack, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CrushList = () => {
  const [showMore, setShowMore] = useState(false);
  const userId = localStorage.getItem("userId");
  const [load, setLoad] = useState("null");
  const navigate = useNavigate();
  const [crushList, setCrushList] = useState([
    { name: "", department: "" },
    { name: "", department: "" },
    { name: "", department: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedCrushList = [...crushList];
    updatedCrushList[index][field] = value;
    setCrushList(updatedCrushList);
  };

  const handleCrushList = async () => {
    const isValid = crushList.every((crush) => crush.name && crush.department);

    if (!isValid) {
      alert("Please fill out the department for all crushes.");
      return;
    }
    setLoad("true");
    //filter out empty crushes
    const filteredCrushList = crushList.filter(
      (crush) => crush.name && crush.department
    );
    console.log(filteredCrushList);
    const res = await fetch(
      "https://circle-backend-hw6e.onrender.com/api/crush_list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          crush: filteredCrushList,
        }),
      }
    ).catch((err) => console.log(err));
    const data = await res.json();
    console.log(data);
    navigate("/");
  };

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center p-2 py-4 text-lg gap-5 font-semibold shadow-lg">
        <div
          className="cursor-pointer text-2xl"
          onClick={() => window.history.back()}
        >
          <MdArrowBack />
        </div>
        <div className="sm:-translate-x-16">Share your College Crush List</div>
      </div>
      {load == "true" ? (
        <div className="text-center min-h-screen justify-center flex items-center">
          You have submitted your List{" "}
        </div>
      ) : (
        <>
          <div className="p-2 flex font-semibold text-start border-[1px] m-2 px-8 pr-10  rounded-lg justify-between items-center text-pink-700">
            <div>
              You will be notified if you get a<br /> crush match from your
              campus!
            </div>
            <div className="text-2xl">
              <FaRegBell />
            </div>
          </div>
          {/* College Crush List */}
          <div className="ml-8 mt-4">
            {crushList.map((crush, index) => (
              <div key={index} className="flex items-start mt-1 gap-3 mb-2">
                <div className="mt-1">
                  <MdCheckBoxOutlineBlank />
                </div>
                <div className="flex flex-col w-full gap-3 justify-start">
                  <div className="text-start p-2 rounded-sm bg-gray-200 w-fit">
                    Crush {index + 1}
                  </div>
                  <input
                    type="text"
                    className={`border-[1px] rounded-sm p-2 focus:outline-none w-[85%] ${
                      !crush.name && crush.department
                        ? "border-red-500 animate-shake"
                        : ""
                    }`}
                    placeholder="Name"
                    value={crush.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className={`border-[1px] w-[85%] rounded-sm p-2 focus:outline-none ${
                      !crush.department && crush.name
                        ? "border-red-500 animate-shake"
                        : ""
                    }`}
                    placeholder="Department"
                    value={crush.department}
                    onChange={(e) =>
                      handleChange(index, "department", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            {/* Show More Button */}
            <div className="flex px-8">
              <button
                className="text-blue-500 "
                onClick={() => {
                  setShowMore(!showMore);
                  showMore
                    ? setCrushList([crushList[0], crushList[1], crushList[2]])
                    : setCrushList([
                        ...crushList,
                        { name: "", department: "" },
                        { name: "", department: "" },
                      ]);
                }}
              >
                {showMore ? "Show Less" : "Add More"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCrushList}
            className="bg-gray-500 text-white rounded-md p-2 my-4"
            type="submit"
          >
            {load == "true" ? "Loading..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
};

export default CrushList;
