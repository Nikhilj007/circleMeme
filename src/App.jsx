import "./App.css";
import {Routes, Route} from 'react-router-dom'
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Memes from "./components/Memes";
import ForYou from "./components/ForYou";
import CreatePost from "./components/CreatePost";
import {useLocation} from "react-router-dom"

function App() {
  const path = useLocation().pathname;
  return (
    <>
    {path!='/create'?<TopNav/>:<></>}
     <Routes>
        <Route path="/memes" element={<Memes/>}/>
        <Route path="/" element={<ForYou/>}/>
        <Route path="/create" element={<CreatePost/>}/>
     </Routes>
     {path!='/create'?<BottomNav/>:<></>}
    </>
  );
}

export default App;
