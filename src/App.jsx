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
  

  const path = useLocation().pathname;
  return (
    <div className="flex justify-center">
      {!path.startsWith('/create') && !path.startsWith('/gossip') && !path.startsWith('/description/') && !path.startsWith('/search') && !path.startsWith('/user') ? <TopNav /> : <></>}
     <Routes>
        <Route path="/memes" element={<Memes/>}/>
        <Route path="/gossip" element={<Gossips/>}/>
        <Route path="/" element={<ForYou />}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/college" element={<College/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/description/:id" element={<ProfileDescription />} />
        <Route path='/upload' element={<Upload/>}/>
     </Routes> 
     {path!='/create'?<BottomNav/>:<></>}
    </div>
  );
}

export default App;
