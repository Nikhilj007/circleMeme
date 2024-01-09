import Post from "./Post";
import meme1 from "../assets/meme1.jpg";
import meme2 from "../assets/meme2.jpg";
import meme3 from "../assets/meme3.jpg";
import meme4 from "../assets/meme4.jpg";
import Question from "./Questions";
import college from "../assets/college.jpg";

const arr= [meme4,meme1,
meme2,
meme3,
]

function College() {
  return (
    <div className="flex relative pb-10 flex-col items-center mt-16  p-0">
      <Post meme={college}/>
      <Question/>
      {arr.map((meme,idx)=>(<Post key={idx} meme={meme}/>) )}
    </div>
  );
}

export default College;
