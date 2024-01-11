import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Profile({user}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(3);
  // eslint-disable-next-line react/prop-types
  const {profile_image,username,cityTown, workplaceCollage, num_likes}=user
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
            setLike(!like);
            like ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
          }}
        >
          {like ? <AiOutlineHeart /> : <AiFillHeart />}
        </button>
      </div>
      <div className="flex justify-around text-base font-thin py-3">
        <div>{likeCount}</div>
        <div>{cityTown}</div>
        {// eslint-disable-next-line react/no-unescaped-entities
        }<div>{workplaceCollage}</div>
      </div>
    </div>
  );
}

export default Profile;
