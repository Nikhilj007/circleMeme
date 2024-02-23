import Post from "./Post";
import { useEffect, useState } from "react";
import ClassicPostLoader from "./PostLoader";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimension";
import { RxCross2 } from "react-icons/rx";

function Memes() {
  const { width } = useWindowDimensions();
  const [arr, setArr] = useState(null);
  const [load, setLoad] = useState(true);
  const [appDisplayed, setAppDisplayed] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  //check if url has ?first
  const handlers = useSwipeable({
    onSwipedLeft: () => navigate("/college"),
    onSwipedRight: () => navigate("/foryou"),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const url = window.location.href;
    const urlHasFirst = url.includes("?first");
    if (urlHasFirst) {
      setAppDisplayed(true);
    }
    async function fetchData() {
      const res = await fetch(
        "https://circle-backend-ewrpf36y4q-el.a.run.app/api/meme_posts/" +
          userId
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setArr(data.posts);
      setLoad(false);
    }
    if (!arr) {
      fetchData();
    }
  }, []);

  const handleAppClose = () => {
    setAppDisplayed(false);
  };

  return (
    <div
      {...handlers}
      className="flex relative pb-10 flex-col items-center pt-16 min-h-screen  p-0"
    >
      {!arr ? (
        <div
          className={`relative ${width < 500 ? "-top-[1rem]" : "top-[2rem]"} ${
            width < 500 ? "left-[7rem]" : "left-[8rem]"
          }`}
        >
          <ClassicPostLoader />
          <ClassicPostLoader />
        </div>
      ) : (
        arr?.map((meme, idx) => <Post key={idx} meme={meme} load={load} />)
      )}
      {appDisplayed && (
        <a
          href="https://play.google.com/store/apps/details?id=com.gorcidsemh.circle"
          className="fixed bottom-10 bg-gray-200 w-full max-w-lg py-4"
        >
          Download the app now
          <div
            onClick={(e) => {
              e.preventDefault();
              handleAppClose();
            }}
            className="absolute top-4 px-2 mr-4 right-0 z-10"
          >
            <RxCross2 />
          </div>
          <img
            width="100px"
            height="100px"
            className="inline px-3"
            src="https://lh3.googleusercontent.com/q1k2l5CwMV31JdDXcpN4Ey7O43PxnjAuZBTmcHEwQxVuv_2wCE2gAAQMWxwNUC2FYEOnYgFPOpw6kmHJWuEGeIBLTj9CuxcOEeU8UXyzWJq4NJM3lg=s0"
            alt=""
          />
        </a>
      )}
    </div>
  );
}

export default Memes;
