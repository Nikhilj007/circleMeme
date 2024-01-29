import Post from "./Post";
import Question from "./Questions";
import { useEffect, useState } from "react";



function College() {

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
    }
    if (!arr) {
      fetchdata();
    }
  }, []);

  return (
    <div className="flex relative pb-10 flex-col items-center mt-16  p-0">
      {/* <Question/> */}
      {arr?.map((meme,idx)=>(<Post key={idx} userId={userId} meme={meme}/>) )}
    </div>
  );
}

export default College;
