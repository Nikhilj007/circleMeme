import "./App.css";
import {Routes, Route} from 'react-router-dom'
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Memes from "./components/Memes";
import ForYou from "./components/ForYou";
import CreatePost from "./components/CreatePost";
import {useLocation} from "react-router-dom"
import College from "./components/Campus";
import Gossips from "./components/Gossips";
import Search from "./components/Search";
import User from "./components/User";
import ProfileDescription from "./components/ProfileDescription";
import { useEffect, useState } from "react";
import Upload from "./components/Upload";
import Privacy from "./components/Privacy";
import CrushList from "./components/CrushList";
import Notifications from "./components/Notifications";
import SinglePost from "./components/SinglePost";
import SIngleGossip from "./components/SIngleGossip";
import {messaging, app} from './firebase'
import { getToken } from "firebase/messaging";
import ClDetail from "./components/ClDetails";
import CrushLis from "./components/CrushNew";

function App() {
  const [img, setImg] = useState(null); 
  const [croppedImage, setCroppedImage] = useState(null);

  async function requqestPermission(){
    const permission = await Notification.requestPermission();
    if(permission==='granted'){
      try {
        const token = await getToken(messaging, { vapidKey: 'BNAIysW2PdMAjLnInpZp384XGZx_GkNa8s182w5ixbkj_FkYf0IdlIkmAuplro1_L97kzjWKSH22iA1hS1bPzQk' });
        console.log("FCM token:", token);
        //check if the token is already present in the local storage
        const oken = localStorage.getItem('fcmToken');
        if(oken){
          return;
        }
        //if not present then send the token to the backend 
         
        fetch('https://circle-backend-ewrpf36y4q-el.a.run.app/api/noti_token',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({token:token,id:localStorage.getItem('userId')
          })
          })
          localStorage.setItem('fcmToken', token);
        } catch (error) {
          console.error("Error generating token:", error);
        }
    }
    else if(permission==='denied'){
      console.log('Notification permission denied')
    }
  }

  useEffect(()=>{
    //request the user for notification permission
    requqestPermission();
  },[])

  useEffect(()=>{
    const currUser= async()=>{
      console.log('currUser')
      const res = await fetch('https://circle.net.in/getUserData.php').catch((err)=>window.location.href='https://circle.net.in/signin.php')
      const data=await res.json()
      localStorage.setItem('userId',data.user_id);
      localStorage.setItem('uniqueId',data.user_uniqueid)
      localStorage.setItem('profile_image',data.profile_image)
      console.log(data)
  }
  // currUser();

  localStorage.setItem('userId',7);
  localStorage.setItem('profile_image','647c56b8e34d4.jpg')

}
,[])

  const path = useLocation().pathname;
  return (
    <div className="flex font-heebo justify-center ">
      {
        path=='/' || path.startsWith('/college') ||path.startsWith('/foryou')? <TopNav/>:null
      }
     <Routes>
        <Route path="/gossip" element={<Gossips />}/>
        <Route path="/foryou" element={<ForYou />}/>
        <Route path="/create" element={<CreatePost />}/>
        <Route path="/college" element={<College />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/user" element={<User img={img}  setImg={setImg}/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path="/description/:id" element={<ProfileDescription />} />
        <Route path='/crushes' element={<CrushList/>}/>
        <Route path='/notify' element={<Notifications/>}/>
        <Route path='/singlepost/:id' element={<SinglePost/>}/>
        <Route path='/newgossip/:id' element={<SIngleGossip/>}/>
        <Route path="/" element={<Memes />}/>
        <Route path="/cldetail" element={<ClDetail/>}/>
        <Route path='/crush_update' element={<CrushLis/>}/>
        <Route path='/upload' element={<Upload img={img} setCroppedImage={setCroppedImage} croppedImage={croppedImage}/>}/>

     </Routes> 
     {path!='/create' && path!='/privacy' && path!='/cldetail'&& path!='/crushes'?<BottomNav/>:<></>}
    </div>
  );
}

export default App;
