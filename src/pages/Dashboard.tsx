import { useState } from "react";
import { FiLayout, FiBox, FiUser } from "react-icons/fi";
import About from "../components/Dashboard/About";
import OverView from "../components/Dashboard/OverView";
import Spaces from "../components/Dashboard/Spaces";
import CreateSpace from "../components/Popups/CreateSpace";
import { CreateSpacePopupAtom } from "../store/Popup";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const [CompState, setCompState] = useState("About");
  const CreateSpacePopup = useRecoilValue(CreateSpacePopupAtom);
  const handleCompState = (e: any) => {
    const id = e.target.id;
    const comp = id.split("-")[0];
    setCompState(comp);
    const elements = document.querySelectorAll("li");
    elements.forEach((element) => {
      if (element.id !== id) {
        element.classList.remove("bg-[#121212]");
      }
    });
    const compElement = document.getElementById(id);
    if (compElement) compElement.classList.add("bg-[#121212]");
   
  };

  return (
    <div className="h-[90vh] w-full p-5">
      {CreateSpacePopup && <CreateSpace />}
      <div className="h-full w-full   p-5 rounded-lg">
        <ul className="w-full px-3 gap-5 flex">
          <li
            onClick={handleCompState}
            id="About-Comp"
            className="hover:bg-[#1a1a1a] flex items-center gap-2 cursor-pointer px-3 py-2 rounded-t-md "
          >
            <FiUser className="inline-block" />
            About
          </li>
          <li
            id="Overview-Comp"
            onClick={handleCompState}
            className="hover:bg-[#121212] flex items-center gap-2 cursor-pointer px-3 py-2 rounded-t-md "
          >
            <FiLayout className="inline-block" />
            Overview
          </li>
          <li
            id="Spaces-Comp"
            onClick={handleCompState}
            className="hover:bg-[#121212] flex items-center gap-2 cursor-pointer px-3 py-2 rounded-t-md "
          >
            <FiBox className="inline-block" />
            Spaces
          </li>
        </ul>
        <div className="w-full h-full p-5 bg-[#121212] rounded-lg">
          {CompState === "About" && <About />}
          {CompState === "Overview" && <OverView />}
          {CompState === "Spaces" && <Spaces />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
