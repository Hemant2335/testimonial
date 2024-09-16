import { useState } from "react";
import { FiLayout, FiBox, FiUser } from "react-icons/fi";
import About from "../components/Dashboard/About";
import OverView from "../components/Dashboard/OverView";
import Spaces from "../components/Dashboard/Spaces";
import CreateSpace from "../components/Popups/CreateSpace";
import { CreateSpacePopupAtom } from "../store/Popup";
import {  useRecoilValue } from "recoil";
import { userState } from "../store/User";
import Appointments from "../components/Dashboard/Appointments";

const Dashboard = () => {
  const [CompState, setCompState] = useState("About");
  const User = useRecoilValue(userState);
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
    <div className="h-[85vh] w-full md:p-5">
      {CreateSpacePopup && <CreateSpace />}
      <div className="h-full  w-full   p-5 rounded-lg">
        <ul className="w-full md:px-3 gap-5 md:flex">
          <li
            onClick={handleCompState}
            id="About-Comp"
            className="hover:bg-[#121212] font-medium flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md md:rounded-t-md "
          >
            <FiUser className="inline-block" />
            About
          </li>
          <li
            id="Overview-Comp"
            onClick={handleCompState}
            className="hover:bg-[#121212] font-medium  flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md md:rounded-t-md "
          >
            <FiLayout className="inline-block" />
            Overview
          </li>
          {User && User.type === "USER" ? (
            <li
              id="Appointment-Comp"
              onClick={handleCompState}
              className="hover:bg-[#121212] font-medium  flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md md:rounded-t-md "
            >
              <FiBox className="inline-block" />
              Appointments
            </li>
          ) : (
            <li
              id="Spaces-Comp"
              onClick={handleCompState}
              className="hover:bg-[#121212] flex items-center gap-2 cursor-pointer px-3 py-2 rounded-t-md "
            >
              <FiBox className="inline-block" />
              Spaces
            </li>
          )}
        </ul>
        <div className="w-full h-[60vh] md:h-full p-5 md:mt-0 mt-5 bg-[#121212] rounded-lg">
          {CompState === "About" && <About />}
          {CompState === "Overview" && <OverView />}
          {CompState === "Spaces" && <Spaces />}
          {CompState === "Appointment" && <Appointments/>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
