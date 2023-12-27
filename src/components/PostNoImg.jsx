import { useState } from "react";
import profile from "../assets/user-8.jpg";
import { MdComment } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

function PostNoImg() {
    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(3);
    const [showComment, setShowComment] = useState(false);
    const text =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatum consequuntur quas quidem fugiat! Minima officia perspiciatis vel aspernatur amet veniam. Voluptas vitae quam quaerat aspernatur eveniet! Quasi repudiandae porro quaerat numquam explicabo eveniet neque quisquam, soluta nostrum nesciunt illum!";
    return (
      <>
        <div className="max-w-lg rounded-lg bg-white text-lg p-5 mb-2">
          <div className="flex justify-between items-center mb-2 ">
            <div className="flex gap-3">
              <div className="rounded-full overflow-hidden h-[60px]">
                <img width={"60px"} height={"45px"} src={profile} alt="fsdf" />
              </div>
              <div className="text-start">
                <div className="font-bold">Subrata Singha</div>
                <div className="text-gray-500">2 hours ago</div>
              </div>
            </div>
            <div>
              <button className="text-gray-500">...</button>
            </div>
          </div>
          <div className="text-gray-400 text-start text-sm mb-2">
            {showMore ? text : text.substring(0, 150)}
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-500"
            >
              {showMore ? "show less" : "show more"}
            </button>
          </div>
          <div className="flex px-2 gap-2">
            <div className="flex gap-5">
              <div className="flex items-center mt-3">
              <button
                onClick={() => {setLike(!like); like ? setLikeCount(likeCount-1) : setLikeCount(likeCount+1)}}
               className="flex items-center gap-2">
               {like ? <div className="opacity-25 ">😂</div> : <div>😂</div>}
                <span>{likeCount}</span>
              </button>
              </div>
              <div className="flex items-center mt-3">
                <button onClick={()=>setShowComment(!showComment)} 
                 className="flex items-center gap-2">
                  <MdComment/>
                  <span>12</span>
                </button>
              </div>
            </div>
          </div>
          {showComment && (
          <div className="bg-gray-300 p-2 rounded-sm">
            <div className="flex justify-around ">
              <input
                className="outline-none w-5/6"
                type="text"
                placeholder="Leave your thoughts here"
              />
              <button className="bg-blue-500 text-white rounded-full p-2">
                <IoMdSend />
              </button>
            </div>
        </div>    
        )}
        </div>
      </>
     );
}

export default PostNoImg;