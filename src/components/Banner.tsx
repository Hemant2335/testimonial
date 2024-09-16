import Card1 from "./TestiCards/Card1";
import { userState } from "../store/User";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const Banner = () => {

  const User = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F6EE] overflow-y-hidden text-black w-full rounded-xl h-[80vh] py-[4vh]">
      <div className="w-full text-center shadow-xl py-[4vh]">
        <h2 className="font-bold text-[4vh] md:text-[7vh]">
          Say goodbye to Long Queues
          <br />
          and wasted time
        </h2>
        <p className="mt-[1vh] text-[2.4vh]">
          the ultimate solution for Individuals who value their Time.
        </p>
        {User.name ? (<button onClick={()=>navigate("/dashboard")} className="mt-[5vh] bg-[#1a1a1a] text-white p-3 rounded-md">
          Go to Dashboard
        </button>) : (<button onClick={()=>navigate("/Login")} className="mt-[5vh] bg-[#1a1a1a] text-white p-3 rounded-md">
          Get Started
        </button>)}
        
      </div>
      <div className="h-[40vh] overflow-y-auto no-scrollbar  flex md:flex-row flex-col  gap-2 p-2">
          <Card1 color="#522258"/>
          <Card1 color="#8C3061"/>
          <Card1 color="#C63C51"/>
          <Card1 color="#C63C51"/>
          <Card1 color="#D95F59"/>
      </div>
    </div>
  );
};

export default Banner;
