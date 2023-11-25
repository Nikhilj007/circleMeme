import "./App.css";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import Create from "./components/Create";

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
     </Routes>
    </>
  );
}

export default App;
