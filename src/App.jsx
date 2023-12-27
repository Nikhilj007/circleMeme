import "./App.css";
import {Routes, Route} from 'react-router-dom'
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Memes from "./components/Memes";
import ForYou from "./components/ForYou";

function App() {
  return (
    <>
    <TopNav/>
     <Routes>
        <Route path="/memes" element={<Memes/>}/>
        <Route path="/" element={<ForYou/>}/>
     </Routes>
     <BottomNav/>
    </>
  );
}

export default App;
