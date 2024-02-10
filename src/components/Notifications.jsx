import React, { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import Profile from "../assets/user-8.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [options, setOptions] = useState(false);
  const optionsRef = React.useRef(null);
  const userId = localStorage.getItem("userId");
  const [arr, setArr] = useState(null); // [{},{}]
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  //click outside to close

  const onAccept = (sender_id, noti_id) => {
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/accept/${userId}/${sender_id}/${noti_id}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onReject = (sender_id, noti_id) => {
    fetch(
      `https://circle-backend-hw6e.onrender.com/api/decline/${userId}/${sender_id}/${noti_id}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        options &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target)
      ) {
        setOptions(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [options]);

 

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://circle-backend-hw6e.onrender.com/api/notification/" + userId
      ).catch((err) => console.log(err));
      const data = await res.json();
      console.log(data);
      setArr(data.posts);
      setLoad(false);
    };
    fetchData();
  }, []);

  const timeAgo = (date1) => {
    const date = new Date(date1);
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  return (
    <div className="p-2 mt-1 w-full max-w-lg mb-10 min-h-0">
      <div className="w-full text-sm flex relative items-center justify-between">
        <div>Notifications</div>
        {/* <div onClick={() => setOptions(!options)} className="pr-2 text-xl">
          <FaEllipsisVertical />
        </div> */}
        {options && (
          <div
            ref={optionsRef}
            className="absolute top-5 right-5 z-50 bg-white rounded-md shadow-md"
          >
            <div className="p-5 py-2 rounded-t-md hover:bg-gray-200">
              Profile You Liked
            </div>
            <div className="p-5 py-2  hover:bg-gray-200">
              Liked Your Profile
            </div>
            <div className="p-5 py-2 rounded-b-md hover:bg-gray-200">
              Friend Circle
            </div>
          </div>
        )}
      </div>
      <div>
        {load ? (
          <div className="min-h-screen flex justify-center items-center">
            <div className="loader "></div>
          </div>
        ) : (
          arr?.map((notify, idx) => (
            <div
              onClick={() =>notify.type==3  || notify.type==4?navigate('/singlepost/'+notify.content_id):notify.type==6?navigate(`/newgossip/${notify.content_id}`):{}}
              key={idx}
              className="flex justify-between relative p-3 py-5 items-center border-b-[1px] "
            >
              <div className="flex gap-3 items-center">
                <img
                  onClick={() => notify.type!=5?navigate("/description/" + notify.sender_id):{}}
                  src={`https://circle.net.in/upload/${
                    notify.sender_profile_pic
                      ? notify.sender_profile_pic
                      : "defaultProfileImg.jpg"
                  }`}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />

                <div className="text-start">
                  <Link
                    to={`/description/${notify.sender_id}`}
                    className="font-bold"
                  >
                    {notify.sender_username}
                  </Link>
                  <div>
                    {notify.notification}{" "}
                    {notify.type == 0 ? (
                      <>
                        <br />
                        <div className="flex gap-8">
                          <button
                            onClick={() =>
                              onAccept(notify.sender_id, notify.noti_id)
                            }
                            className="bg-gray-500 text-white rounded-md p-1 px-3"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              onReject(notify.sender_id, notify.noti_id)
                            }
                            className="bg-gray-500 text-white rounded-md p-1 px-3"
                          >
                            Reject
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <span className="text-blue-600">
                      {notify.type == 2
                        ? `| Your Profile has now ${notify.num_likes} likes`
                        : ""}
                      {notify.type == 3
                        ? `| Your post has now ${notify.num_likes} likes`
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 absolute top-3 right-0">
                  {timeAgo(notify.date_time)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
