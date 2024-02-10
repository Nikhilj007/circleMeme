import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
function Search() {
  const navigate = useNavigate();
  const input = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const userId = localStorage.getItem("userId");
  const [students, setStudents] = useState([]); // [{},{}
  const [colleges, setColleges] = useState([]); // ""
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  const handlechange = (e) => {
    handleDebouncedChange(e.target.value);
  };

  const handleDebouncedChange = debounce(async (value) => {
    try {
      const res = await fetch(
        `https://circle-backend-hw6e.onrender.com/api/search/${value}/${userId}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setShowResults(true);
      setStudents(data.student);
      setColleges(data.college);
      // Handle the data as needed
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, 500);

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <div className="p-2 py-0 flex flex-col justify-start content-start text-start bg-white ">
      <div className="fixed bg-white lg:left-1/3 left-6 w-[97%] max-w-lg mx-auto flex items-center border-[1px] border-gray-300 -ml-[1.15rem] px-1">
        <button onClick={() => navigate(-1)} className="text-3xl">
          <MdArrowBack />
        </button>
        <input
          ref={input}
          onChange={(e) => handlechange(e)}
          className="w-11/12 p-3 focus:outline-none"
          type="text"
          placeholder="search something"
        />
        <div>
          <FaSearch />
        </div>
      </div>
      <div className="h-14 w-full flex text-start bg-white"></div>
      {showResults &&
        students.map((student) => (
          <Link
            to={`/description/${student.id}`}
            className="flex items-center justify-start text-left w-full mt-4"
          >
            <div className="border-2 border-gray-300 rounded-full">
              <img
                src={`http://circle.net.in/upload/${student.profile_image}`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-semibold">{student.username}</div>
              <div className="text-gray-500">{student.workplaceCollage}</div>
            </div>
          </Link>
        ))}
      {showResults &&
        Object.keys(colleges).map((college) => (
          <Link
            to={`/gossip?college=${college}`}
            className=" flex items-center  text-left w-full mt-4"
          >
            <div className=" border-2 border-gray-300 p-3 rounded-full">
              <CiStar className="w-5 h-5 rounded-full" />
            </div>
            <div className="text-sm font-semibold ml-4">
              {college}
            </div>
          </Link>
        ))}
      {showResults &&
        Object.keys(colleges).map((collegeName) => (
          <div key={collegeName}>
            {colleges[collegeName].map((student) => (
              <Link
                to={`/description/${student.id}`}
                className="flex items-center text-left w-full mt-4"
              >
                <div className=" border-2 border-gray-300 rounded-full">
                  <img
                    src={`http://circle.net.in/upload/${student.profile_image}`}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="ml-4">
                <div className="text-sm font-semibold">{student.username}</div>
              <div className="text-gray-500">{collegeName}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
}

export default Search;
