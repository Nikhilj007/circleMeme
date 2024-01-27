import { useEffect } from "react";
import Profile from "./Profile";
import { useUser } from "./UserContext";


function ForYou() {
    const {users, setUsers} = useUser();
    useEffect(()=>{
        const fetchdata=async()=>{
            const res=await fetch('https://circle-backend-hw6e.onrender.com/api/users/2').catch((err)=>console.log(err))
            const data=await res.json()
            console.log(data)
            setUsers(data.users)
        }
        const currUser= async()=>{
            console.log('currUser')
            const res = await fetch('https://circle.net.in/getUserData.php').catch((err)=>console.log(err))
            const data=await res.json()
            console.log(data)
        }
        
        if(!users){
            fetchdata()
            currUser();
        }
    },[])
    
    
    return ( 
        <div className="flex relative pb-10 flex-col items-center mt-16  p-0">
            {users?.map((user,idx)=>(<Profile key={idx} user={user}/>) )}
        </div>
     );
}

export default ForYou;