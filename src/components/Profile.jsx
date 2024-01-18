import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LuDot } from "react-icons/lu";

  // eslint-disable-next-line react/prop-types
function Profile({user}) {
  // eslint-disable-next-line react/prop-types
  const {profile_image,username,cityTown, workplaceCollage, num_likes,like}=user
  const [liked, setLike] = useState(like);
  const [likeCount, setLikeCount] = useState(3);
  return (
    <div className="w-full rounded-lg text-lg px-0 shadow-xl mb-4">
      <div className="flex w-full justify-center">
        <img
          loading="lazy"
          className="rounded-sm w-full h-96"
          src={`https://circle.net.in/upload/${profile_image}`}
          alt=""
        />
      </div>
      <div className="flex justify-between px-4 py-2">
        <div></div>
        <div>{username}</div>
        <button
          className="text-red-600 text-3xl active:scale-75 transition-all duration-150"
          onClick={() => {
            setLike(!liked);
            liked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
          }}
        >
          {liked ? <AiOutlineHeart /> : <AiFillHeart />}
        </button>
      </div>
      <div className="flex gap-2 justify-center text-base px-2  items-center py-3">
        <div>{num_likes}</div>
        <div className="text-3xl">
          <LuDot />
        </div>
        <div>{cityTown}</div>
        <div className="text-3xl">
          <LuDot />
        </div>
        {// eslint-disable-next-line react/no-unescaped-entities
        }<div>{workplaceCollage}</div>
      </div>
    </div>
  );
}

export default Profile;
