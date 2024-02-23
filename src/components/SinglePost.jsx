import React, { useEffect, useState } from "react";
import Post from "./Post";
import { MdArrowBack } from "react-icons/md";

const SinglePost = () => {
  const userId = localStorage.getItem("userId");
  const post_id = window.location.href.split("/").pop();
  const [post, setPost] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://circle-backend-ewrpf36y4q-el.a.run.app/api/post/${post_id}/${userId}`
        );
        const data = await res.json();
          console.log(data)
        if (data && data.posts && data.posts.length > 0) {
          setPost(data.posts[0]);
        } else {
          console.error("Invalid data format or empty posts array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    if (!post) {
      fetchData();
    }
  }, [post, post_id, userId]);
  

  return (
    <div className="max-w-lg w-full mb-10 min-h-screen">
      <div className="flex items-center p-2 py-4 text-lg justify-between font-semibold shadow-lg">
        <div
          className="cursor-pointer text-2xl"
          onClick={() => window.history.back()}
        >
          <MdArrowBack />
        </div>
      </div>
      {!post? <div className="relative top-1/2 left-1/2">
        <div className="loader"></div>
      </div>:<Post meme={post} />}
    </div>
  );
};

export default SinglePost;
