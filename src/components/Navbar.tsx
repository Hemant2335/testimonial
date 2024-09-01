import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex py-[2vh] items-center justify-between px-[2vw]">
      <h1 className="font-bold text-xl">TESTIMONIAL</h1>
      <div className="bg-[#1a1a1a] w-fit h-fit shadow-4xl p-3 title rounded-xl  z-10">
        <nav>
          <ul className="flex items-center font-medium gap-[3vh] text-md">
            <li className="hover:text-[#097969] cursor-pointer transition-transform nav-home ">
              Home
            </li>
            <li className="hover:text-[#097969] cursor-pointer transition-transform nav-About">
              About
            </li>
            <li className="hover:text-[#097969] cursor-pointer transition-transform py-1 px-2 rounded-md">
              Explore
            </li>
          </ul>
        </nav>
      </div>
      <button className="bg-[#F9F6EE] text-black px-[2vw] text-sm py-2 rounded-2xl">
        Login
      </button>
    </div>
  );
};

export default Navbar;
