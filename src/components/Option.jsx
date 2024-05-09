import { motion } from "framer-motion";

const Option = ({ option, handleOption, optionPercentage,id }) => {

  return (
    <motion.div whileTap={{ scale: 0.95 }} onClick={()=>handleOption(id)} className="relative cursor-pointer w-full rounded-lg p-3 bg-gray-100 text-start text-gray-600 mb-2">
        <motion.div
            className="absolute top-0 opacity-20 left-0 h-full bg-gray-600 rounded-lg"
            style={{ width: `${optionPercentage==null?0:optionPercentage}%`, transition: "width 0.5s ease-in-out" }}
            initial={{ width: 0 }}
            animate={{ width: `${optionPercentage==null?0:optionPercentage}%` }}
            
        ></motion.div>
        <div className="flex items-center justify-between ">
            <p>{option}</p>
            <p>{optionPercentage==null?'':optionPercentage}{optionPercentage?'%':""}</p>
        </div>
    </motion.div>
  );
};

export default Option;
