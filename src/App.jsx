import "./App.css";
import {Routes, Route} from 'react-router-dom'
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Memes from "./components/Memes";
import ForYou from "./components/ForYou";
import CreatePost from "./components/CreatePost";
import {useLocation} from "react-router-dom"
import College from "./components/college";
import Gossips from "./components/Gossips";
import Search from "./components/Search";
import User from "./components/User";
import ProfileDescription from "./components/ProfileDescription";
import { useEffect, useState } from "react";
import Upload from "./components/Upload";

function App() {
  const [img, setImg] = useState(null); 
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(()=>{
    // const currUser= async()=>{
    //   console.log('currUser')
    //   const res = await fetch('https://circle.net.in/getUserData.php').catch((err)=>console.log(err))
    //   const data=await res.json()
    //   localStorage.setItem('userId',data.user_id);
    //   localStorage.setItem('uniqueId',data.user_uniqueid)
    //   console.log(data)
  // }
  // currUser();

  localStorage.setItem('userId',2);

}
,[])


  const path = useLocation().pathname;
  return (
    <div className="flex justify-center">
      {!path.startsWith('/create') && !path.startsWith('/gossip') && !path.startsWith('/description/') && !path.startsWith('/search') && !path.startsWith('/user') ? <TopNav /> : <></>}
     <Routes>
        <Route path="/memes" element={<Memes />}/>
        <Route path="/gossip" element={<Gossips />}/>
        <Route path="/" element={<ForYou />}/>
        <Route path="/create" element={<CreatePost />}/>
        <Route path="/college" element={<College />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/user" element={<User img={img}  setImg={setImg}/>}/>
        <Route path="/description/:id" element={<ProfileDescription />} />
        <Route path='/upload' element={<Upload img={img} setCroppedImage={setCroppedImage} croppedImage={croppedImage}/>}/>
     </Routes> 
     {path!='/create'?<BottomNav/>:<></>}
    </div>
  );
}

export default App;
