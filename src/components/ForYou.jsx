import { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";


function ForYou() {
    const [users, setUsers] = useState(null); // [{},{}
    const [load, setLoad] = useState(true); // [{},{}
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handlers = useSwipeable({
        onSwipedLeft: () => navigate('/'),
        delta:200
      });
    useEffect(()=>{
        window.scrollTo(0, 0);
        if (!userId || userId==="undefined") {
            window.location.href = "https://4.240.73.133/signin.php";
          }
      
        const fetchdata=async()=>{
            const res=await fetch('https://anonymously.link/backend/api/users/'+userId).catch((err)=>console.log(err))
            const data=await res.json()
            // console.log(data)
            setUsers(data.users)
        }
        
        
        if(!users){
            fetchdata()
        }
    },[])
    
    
    return ( 
        <div
        {...handlers}
         className="flex relative pb-10 flex-col items-center mt-16 min-h-screen  p-0">
            {!users?<div className="relative top-1/2"><div className="loader"></div></div>:users?.map((user,idx)=>(<Profile key={idx} user={user}/> ))}
        </div>
     );
}

export default ForYou;