import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Profile({ user }) {
  // eslint-disable-next-line react/prop-types
  const {profile_image, username, cityTown, workplaceCollage, num_likes, like, id, unique_id
  } = user;
  const [liked, setLike] = useState(like);
  const [likeCount, setLikeCount] = useState(num_likes);
  const userId = localStorage.getItem("userId");

  const handleClick = () => {

    const formData =new  URLSearchParams({
      cur_num_likes: likeCount,
      sender_id:userId,
      rec_id:id,
    });
    console.log(formData);
    fetch(`https://anonymously.link/backend/api/${liked?"pro_dislike":"pro_like"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      setLike(!liked);
      liked?setLikeCount(likeCount - 1):setLikeCount(likeCount + 1);
    })
    .catch ((err)=>console.log(err));
  };
  return (
    <div className="w-full max-w-lg rounded-lg text-lg px-0 shadow-xl mb-4">
      <div className="flex w-full justify-center">
        <img
          loading="lazy"
          className="rounded-sm w-full"
          src={`https://4.240.73.133/upload/${profile_image}`}
          alt=""
        />
      </div>
      <div className="relative py-2">
        <div></div>
        <Link to={`/description/${id}`} className="cursor pointer">{username}</Link>
        <button
          className="text-red-600 absolute right-1 text-3xl active:scale-75 transition-all duration-150"
          onClick={handleClick}
        >
          {liked ? < AiFillHeart/> : < AiOutlineHeart/>}
        </button>
      </div>
      <div className="flex justify-center gap-2 ml-1 items-center m text-sm py-2">
        <div>{likeCount}</div>
        <div className="text-3xl">
          <LuDot />
        </div>
        <div>{cityTown}</div>
        <div className="text-3xl">
          <LuDot />
        </div>
        {
          // eslint-disable-next-line react/no-unescaped-entities
        }
        <div>{workplaceCollage}</div>
      </div>
    </div>
  );
}

export default Profile;
