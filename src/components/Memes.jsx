import Post from "./Post";
import { useEffect, useState } from "react";
import ClassicPostLoader from "./PostLoader";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

function Memes() {
  const [arr, setArr] = useState(null);
  const [load, setLoad] = useState(true); // [{},{}
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/college"),
    onSwipedRight: () => navigate("/foryou"),
  });

  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-hw6e.onrender.com/api/meme_posts/"+userId
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
    <div {...handlers} className="flex relative pb-10 flex-col items-center pt-16 min-h-screen  p-0">
      {!arr? <div className="relative top-1/2">
        <div className="loader"></div>
      </div>
      :arr?.map((meme, idx) => (
        <Post key={idx} meme={meme} load={load} />
      ))}
    </div>
  );
}

export default Memes;
