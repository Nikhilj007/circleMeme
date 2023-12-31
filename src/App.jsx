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

function App() {
  const path = useLocation().pathname;
  return (
    <div className="flex justify-center">
    {path!='/create'  && path!='/gossip'?<TopNav/>:<></>}
     <Routes>
        <Route path="/memes" element={<Memes/>}/>
        <Route path="/gossip" element={<Gossips/>}/>
        <Route path="/" element={<ForYou/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/college" element={<College/>}/>
     </Routes>
     {path!='/create'?<BottomNav/>:<></>}
    </div>
  );
}

export default App;
