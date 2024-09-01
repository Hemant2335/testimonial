import Card1 from "./TestiCards/Card1";

const Banner = () => {
  return (
    <div className="bg-[#F9F6EE] overflow-y-hidden text-black w-full rounded-xl h-[80vh] py-[4vh]">
      <div className="w-full text-center shadow-xl py-[4vh]">
        <h2 className="font-medium text-[7vh]">
          Say goodbye to Old Testimonials
          <br />
          and wasted time
        </h2>
        <p className="mt-[1vh]">
          the ultimate solution for business who value their Testimonials.
        </p>
        <button className="mt-[5vh] bg-[#1a1a1a] text-white p-3 rounded-md">
          Get Started
        </button>
      </div>
      <div className="h-[40vh] flex  gap-2 p-2">
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
