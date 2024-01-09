import Post from "./Post";
import meme1 from "../assets/meme1.jpg";
import meme2 from "../assets/meme2.jpg";
import meme3 from "../assets/meme3.jpg";
import meme4 from "../assets/meme4.jpg";

const arr= [meme4,meme1,
meme2,
meme3,
]
function Memes() {
  return (
    <div className="flex relative pb-10 flex-col items-center pt-14 bg-[#ECF6FB] p-0">
      {arr.map((meme,idx)=>(<Post key={idx} meme={meme}/>) )}
    </div>
  );
}

export default Memes;
