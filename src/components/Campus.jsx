import { Link } from "react-router-dom";
import Post from "./Post";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import useWindowDimensions from "../hooks/useWindowDimension";
import ClassicPostLoader from "./PostLoader";
import demo from '../assets/demo.png'

function College() {
  const [load, setLoad] = useState(true); 
  const [arr, setArr] = useState(null);
  const navigate = useNavigate();
  const {width} = useWindowDimensions();

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/gossip"),
    onSwipedRight: () => navigate("/foryou"),
    delta:200
  });

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    //scroll to top
    window.scrollTo(0, 0);
    //redirect if no userId
    if (!userId || userId==="undefined") {
      window.location.href = "https://circle.net.in/signin.php";
    }

    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-ewrpf36y4q-el.a.run.app/api/college_posts/"+userId
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
    <div {...handlers} className="flex relative pb-10 flex-col min-h-screen items-center mt-16  p-0">
      {/* <Question/> */}
      <div className="border-[1px] m-2 mt-1 px-2 py-2 max-[330px]:px-0 max-[410px]:px-1 max-[410px]:text-sm rounded-lg text-black">Share your crush list from campus <Link className="px-3 border-[1px] py-1 rounded-lg font-semibold max-[410px]:text-sm max-[410px]:px-1 text-pink-700 bg-[#dedede] " to='/crushes'>Create List</Link></div>
      {!arr? <div className={`relative ${width<500?'-top-[1rem]':'top-[2rem]'} ${width<500?'left-[7rem]':'left-[8rem]'}`}>
        <ClassicPostLoader />
        <ClassicPostLoader />
      </div>:arr?.map((meme,idx)=>(<Post key={idx} userId={userId} meme={meme}/>) )}
    </div>
  );
}

export default College;
