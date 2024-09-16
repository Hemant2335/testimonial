import { motion } from "framer-motion";
import { FiCompass, FiHome, FiUser, FiX } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { userState } from "../store/User";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const sidebarVariants = {
    hidden: { x: "100%" }, // Initial state (offscreen to the right)
    visible: { x: 0 }, // Final state (fully visible)
    exit: { x: "100%" }, // Exit state (offscreen to the right)
  };
  const navigate = useNavigate();
  const User = useRecoilValue(userState);
  return (
    <motion.div
      className="fixed Sidebar  hidden h-[100vh] w-screen top-0 left-0 justify-center items-center z-10 bg-[rgba(34,34,34,0.5)]"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sidebarVariants}
      transition={{ ease: "easeInOut", duration: 0.6 }} // Smooth transition
    >
      <div className="h-full absolute right-0 w-[70vw] md:w-[30vw] bg-[#1a1a1a]">
        <FiX
          className="float-right text-2xl cursor-pointer m-4"
          onClick={() => {
            document.querySelector(".Sidebar")?.classList.toggle("hidden");
          }}
        />
        <div className="mt-[5vh] flex justify-center px-2 w-full  items-center">
          {User.name ? (
            <button
              className="bg-[#F9F6EE] w-full  text-black px-[2vw] text-sm py-2 rounded-2xl"
              onClick={() => navigate("/dashboard")}
            >
              Hello {User.name}
            </button>
          ) : (
            <button
              className="bg-[#F9F6EE] w-full text-black px-[2vw] text-sm py-2 rounded-2xl"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>
          )}
        </div>
        <ul className=" mt-10 px-2 flex flex-col gap-3">
          <li
            onClick={() => navigate("/")}
            className="hover:text-[#097969] flex items-center gap-2 justify-center text-center rounded-md  font-medium cursor-pointer transition-transform shadow-5xl nav-home p-3"
          >
            <FiHome />
            Home
          </li>
          <li
            onClick={() => navigate("/dashboard")}
            className="hover:text-[#097969] text-center flex items-center gap-2 justify-center rounded-md  cursor-pointer transition-transform shadow-5xl nav-About p-3"
          >
            <FiUser/>
            About
          </li>
          <li
            onClick={() => navigate("/Explore")}
            className="hover:text-[#097969] flex items-center gap-2 justify-center text-center rounded-md cursor-pointer transition-transform p-3 shadow-5xl "
          >
            <FiCompass />
            Explore
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;
