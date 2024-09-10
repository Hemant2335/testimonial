import Avatar from "../../assets/avatar.jpg";


const Card3 = () => {
  return (
    <div className="min-w-fit justify-center flex   flex-col items-center mt-2 gap-2  h-fit ">
      <img
        src={Avatar}
        alt="avatar"
        className="w-[5vw] h-[5vw] shadow-4xl  rounded-[50%] object-cover"
      />
      <h1 className=" font-medium text-gray-500 ">Barber Name</h1>
    </div>
  );
};

export default Card3;
