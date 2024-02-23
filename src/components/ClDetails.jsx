import { MdArrowBack } from "react-icons/md";
import {useNavigate} from 'react-router-dom'

function ClDetail() {
    const navigate = useNavigate();
  return (
    <div className="p-2 max-w-lg">
      <div className="py-3 text-2xl" onClick={()=>navigate(-1)}>
        <MdArrowBack />
      </div>
      <div className="text-blue-300 p-3 text-start">Read how crush list works </div>
      <div className="text-start px-3 pt-2">
        You will receive a notification when mutual
        crush is identified from your list of crushes. Your crush will only be
        notified about it if they mention you on their crush list as well.
      </div>
    </div>
  );
}

export default ClDetail;
