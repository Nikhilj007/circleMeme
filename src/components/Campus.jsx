import { Link } from "react-router-dom";
import Post from "./Post";
import Question from "./Questions";
import { useEffect, useState } from "react";



function College() {
  const [load, setLoad] = useState(true); // [{},{}

  const [arr, setArr] = useState(null);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-hw6e.onrender.com/api/college_posts/"+userId
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setArr(data.posts);
      setLoad(false);
    }
    if (!arr) {
      fetchdata();
    }
  }, []);

  return (
    <div className="flex relative pb-10 flex-col min-h-screen items-center mt-16  p-0">
      {/* <Question/> */}
      <div className="border-[1px] m-2 mt-1 px-2 py-2 rounded-lg text-black">Share your crush list from campus <Link className="px-3 border-[1px] py-1 rounded-lg font-semibold text-pink-700 bg-[#E6CCFF]" to='/crushes'>Create List</Link></div>
      {!arr?<div className="relative top-1/2"><div className="loader"></div></div>:arr?.map((meme,idx)=>(<Post key={idx} userId={userId} meme={meme}/>) )}
    </div>
  );
}

export default College;
