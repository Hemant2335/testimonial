import { useLocation, useNavigate } from "react-router-dom";
import { userState } from "../store/User";
import {  useRecoilValue } from "recoil";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const User = useRecoilValue(userState);
  return (
    <>
      <Sidebar />
      {!(
        location.pathname.includes("/Login") ||
        location.pathname.includes("/Signup")
      ) && (
        <div className="w-full flex py-[2vh] items-center justify-between px-[2vw]">
          <h1
            className="font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            SLOTIN
          </h1>
          <div className="bg-[#1a1a1a] w-fit h-fit shadow-4xl p-3 title rounded-xl hidden md:flex  z-10">
            <nav>
              <ul className="flex items-center font-medium gap-[3vh] text-md">
                <li
                  onClick={() => navigate("/")}
                  className="hover:text-[#097969] cursor-pointer transition-transform nav-home "
                >
                  Home
                </li>
                <li
                  onClick={() => navigate("/dashboard")}
                  className="hover:text-[#097969] cursor-pointer transition-transform nav-About"
                >
                  About
                </li>
                <li
                  onClick={() => navigate("/Explore")}
                  className="hover:text-[#097969] cursor-pointer transition-transform py-1 px-2 rounded-md"
                >
                  Explore
                </li>
              </ul>
            </nav>
          </div>
          {User.name ? (
            <button
              className="bg-[#F9F6EE] hidden md:flex text-black px-[2vw] text-sm py-2 rounded-2xl"
              onClick={() => navigate("/dashboard")}
            >
              Hello {User.name}
            </button>
          ) : (
            <button
              className="bg-[#F9F6EE] hidden md:flex text-black px-[2vw] text-sm py-2 rounded-2xl"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>
          )}
          <div className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                document.querySelector(".Sidebar")?.classList.toggle("hidden");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
