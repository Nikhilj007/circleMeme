import { useEffect, useState } from "react";
import Profile from "./Profile";


function ForYou() {
    const [users,setUsers]=useState(null)

    
    useEffect(()=>{
        const fetchdata=async()=>{
            const res=await fetch('https://circle-backend-hw6e.onrender.com/api/users/2').catch((err)=>console.log(err))
            const data=await res.json()
            setUsers(data)
        }
        const currUser= async()=>{
            const res = await fetch('https://circle.net.in/getUserData.php',


            ).catch((err)=>console.log(err))
            const data=await res.json()
            console.log(data)
        }
        currUser();
        if(!users){
            fetchdata()
        }
    },[])
    return ( 
        <div className="flex relative pb-10 flex-col items-center mt-16  p-0">
            {users?.users?.map((user,idx)=>(<Profile key={idx} user={user}/>) )}
        </div>
     );
}

export default ForYou;