import { useEffect, useState } from "react";
import Profile from "./Profile";
import { useUser } from "./UserContext";


function ForYou() {
    const {users, setUsers} = useUser();
    const [load, setLoad] = useState(true); // [{},{}
    const userId = localStorage.getItem("userId");
    useEffect(()=>{
        const fetchdata=async()=>{
            const res=await fetch('https://circle-backend-hw6e.onrender.com/api/users/'+userId).catch((err)=>console.log(err))
            const data=await res.json()
            console.log(data)
            setUsers(data.users)
        }
        
        
        if(!users){
            fetchdata()
        }
    },[])
    
    
    return ( 
        <div className="flex relative pb-10 flex-col items-center mt-16 min-h-screen  p-0">
            {!users?<div className="relative top-1/2"><div className="loader"></div></div>:users?.map((user,idx)=>(<Profile key={idx} user={user}/> ))}
        </div>
     );
}

export default ForYou;