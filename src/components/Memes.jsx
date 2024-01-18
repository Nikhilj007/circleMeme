import Post from "./Post";
// import meme1 from "../assets/meme1.jpg";
// import meme2 from "../assets/meme2.jpg";
// import meme3 from "../assets/meme3.jpg";
// import meme4 from "../assets/meme4.jpg";
import { useEffect, useState } from "react";

function Memes() {
  const [arr, setArr] = useState(null);
  useEffect(() => {
    async function fetchdata() {
      const res = await fetch(
        "https://circle-backend-hw6e.onrender.com/api/meme_posts/2"
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setArr(data.posts);
    }
    if (!arr) {
      fetchdata();
    }
  }, []);
  return (
    <div className="flex relative pb-10 flex-col items-center pt-14 bg-[#ECF6FB] p-0">
      {arr?.map((meme, idx) => (
        <Post key={idx} meme={meme} />
      ))}
    </div>
  );
}

export default Memes;
