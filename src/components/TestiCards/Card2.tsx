import { motion } from "framer-motion";
import Avatar from "../../assets/avatar.jpg";

type Card1Props = {
  color: string;
};

const Card2 = ({ color }: Card1Props) => {
  console.log(color);

  return (
    <motion.div className={` h-fit min-w-fit rounded-lg `}>
      <div className=" w-full top-0 p-2">
        <motion.div
          drag
          dragConstraints={{
            top: -5,
            left: -0.1,
            right: 5,
            bottom: 5,
          }}
          className="w-full  p-2  bg-[#121212] shadow-4xl h-fit rounded-lg"
        >
          <div className=" w-full h-fit p-3 rounded-lg">
            <div className="w-full h-full   items-center gap-2">
              <h2 className=" font-semibold text-[#097969]">Barber</h2>
              <div className="w-full flex items-center mt-2 gap-2  h-fit ">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="w-[2vw] h-[2vw]  rounded-[50%] object-cover"
                />
                <h1 className=" font-medium text-gray-500">Barber Name</h1>
              </div>
              <div className=" flex  flex-col mt-2 p-2 justify-center ">
                <p className="font-medium">Members: 5</p>
                <p className="font-medium">Price : $50</p>
                <p className="font-medium">Location : Somewhere</p>
                <button className="mt-[2vh] shadow-4xl bg-[#1a1a1a] font-medium text-white rounded-md p-2">
                  Book
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card2;
