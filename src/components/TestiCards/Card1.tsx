import { motion } from "framer-motion";
import Avatar from "../../assets/avatar.jpg";

type Card1Props = {
  color: string;
};

const Card1 = ({ color }: Card1Props) => {
  console.log(color);

  return (
    <motion.div
      whileHover={{ y: -80 }}
      className={` h-fit bg-black border-2 border-gray-200 md:w-[20vw] rounded-lg shadow-4xl`}
    >
      <div className=" w-full top-0 p-4 ">
        <motion.div
          className="w-full shadow-4xl p-2 bg-[#1a1a1a] h-fit rounded-lg"
        >
          <div
            className=" w-full h-fit p-3 rounded-lg"
            style={{ backgroundColor: color }}
          >
            <div className="w-full h-full   items-center gap-2">
              <div className="w-full py-2 flex items-center gap-2">
                <img src={Avatar}  alt="avatar" className="w-[5vh] h-[5vh] rounded-[50%]  object-cover" />
                <h2 className=" font-medium">Barber</h2>
              </div>
              
              <div className=" flex flex-col justify-center ">
                
                <p className="text-white text-sm mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione incidunt, aut .....
                </p>
              </div>
            </div>
          </div>
          <button className="mt-[2vh] shadow-4xl bg-black text-white rounded-md p-2">
            Book
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card1;
