import profile from "../assets/user-8.jpg";
import { MdArrowBack } from "react-icons/md";

const User = () => {
  return (
    <div className="w-full bg-red-100">
      <div className="flex text-lg bg-white p-3 justify-start gap-14 font-semibold items-center">
        <div className="text-2xl">
          <MdArrowBack />
        </div>
        <div>Amarya Paul</div>
      </div>
      <div className="h-96 w-full bg-white">
        <img className="h-96 w-full" src={profile} alt="" />
      </div>
      <div className="w-[97%] rounded-md text-start p-4 bg-white mx-auto">
        <div className="font-bold">About</div>
        <div className="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe, accusantium blanditiis sed numquam quas. Error expedita et dolore obcaecati autem deleniti reiciendis velit eius!
        </div>
      </div>
    </div>
  );
};

export default User;
