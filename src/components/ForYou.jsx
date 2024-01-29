import { useEffect } from "react";
import Profile from "./Profile";
import { useUser } from "./UserContext";


function ForYou() {
    const {users, setUsers} = useUser();
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
        <div className="flex relative pb-10 flex-col items-center mt-16  p-0">
            {users?.map((user,idx)=>(<Profile key={idx} userId={user} user={user}/>) )}
        </div>
     );
}

export default ForYou;