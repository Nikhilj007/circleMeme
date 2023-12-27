import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Profile() {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(3);
  return (
    <div className="max-w-lg rounded-lg text-lg px-0 shadow-xl mb-4">
      <div className="flex justify-center">
        <img
          className="rounded-sm w-full h-96"
          src="https://www.circle.net.in/upload/647c7322c4841.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-between px-4 py-2">
        <div></div>
        <div>Niharika Rai</div>
        <button
          className="text-red-600 text-3xl active:scale-75 transition-all duration-150"
          onClick={() => {
            setLike(!like);
            like ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
          }}
        >
          {like ? <AiOutlineHeart /> : <AiFillHeart />}
        </button>
      </div>
      <div className="flex justify-around text-base font-thin py-3">
        <div>{likeCount}</div>
        <div>Kolkata</div>
        <div>St. Joseph's college, Darjeeling</div>
      </div>
    </div>
  );
}

export default Profile;
