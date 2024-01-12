import profile from "../assets/user-8.jpg";
import { MdArrowBack } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";

const User = () => {
  return (
    <div className="w-full max-w-lg bg-red-100 mb-14">
      <div className="flex text-lg bg-white p-3 justify-start gap-14 font-semibold items-center">
        <div className="text-2xl">
          <MdArrowBack />
        </div>
        <div>Amarya Paul</div>
      </div>
      <div className="h-96 w-full bg-white">
        <img className="h-96 w-full" src={profile} alt="" />
      </div>
      <div className="w-[97%] rounded-md mt-2 text-start p-4 bg-white mx-auto">
        <div className="font-bold">About</div>
        <div className="text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam
          saepe, accusantium blanditiis sed numquam quas. Error expedita et
          dolore obcaecati autem deleniti reiciendis velit eius!
        </div>
      </div>
      <div className="w-[97%] rounded-md mt-2 text-start flex flex-col gap-3 p-4 bg-white mx-auto">
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <FiLock />
          </div>
          <div>
            <div className="font-bold text-lg">College</div>
            <div className="text-gray-500">
              St. {"Joseph's"} College, Darjeeling{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <IoLocationOutline />
          </div>
          <div>
            <div className="font-bold text-lg">Kolkata, India</div>
          </div>
        </div>
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <IoEyeOutline />
          </div>
          <div>
            <div className="font-bold text-lg">Department</div>
            <div className="text-gray-500">
              {"Master's"} of Communication and Journalism
            </div>
          </div>
        </div>
        <div className="flex justify-start gap-3 items-center">
          <div className="text-3xl">
            <GoPeople />
          </div>
          <div>
            <div className="font-bold text-lg">amryap@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
