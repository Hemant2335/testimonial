
import { BiChat } from "react-icons/bi";
import { FiClock, FiHeart, FiMapPin, FiTrash } from "react-icons/fi";

type AppointmentCardProps = {
  appointment: {
    id: string;
    date: string | null;
    fromtime: string;
    totime: string;
    space: {
      ShopName: string;
      Address: string;
      City: string;
      Profession: string;
      ImageUrl: string;
    };
  };
};

const AppointmentCard = (props: AppointmentCardProps) => {
  const { appointment } = props;
  return (
    <div className="md:w-[20vw] flex flex-col gap-3 h-fit shadow-4xl bg-[#1E201E] rounded-lg p-3">
      {/* Header */}
      <div className="flex w-full justify-between px-2 items-center gap-2">
        <div className="flex w-full items-center gap-2 ">
          {/* Shop Image */}
          <div className="md:w-[3vw] w-[5vh] h-[5vh] md:h-[3vw] bg-white rounded-[50%]">
            <img
              src={appointment.space.ImageUrl}
              alt="avatar"
              className="w-full h-full rounded-[50%]"
            />
          </div>
          {/* Shop Name and Profession */}
          <div>
            <h1 className="font-semibold text-lg">
              {appointment.space.ShopName}
            </h1>
            <span className="text-[1.1vh] border-[1.1px] p-1 rounded-lg border-gray-400">
              @{appointment.space.Profession}
            </span>
          </div>
        </div>
        {/* Icons */}
        <div className="flex gap-2">
          <FiMapPin className="text-lg cursor-pointer" title="View on Map" />
          <FiHeart
            className="text-lg cursor-pointer"
            title="Add to Favorites"
          />
        </div>
      </div>

      {/* Appointment Date and Time */}
      <div className="flex flex-col gap-1 px-2 w-full my-2">
        <div className="text-sm bg-blue-400 p-2 rounded-md font-medium flex items-center justify-center gap-2 text-black">
          <FiClock className="text-sm" />
          {appointment.fromtime} - {appointment.totime}
        </div>
      </div>

      {/* Address */}
      <div className="flex gap-2 items-center px-2 text-sm">
        <FiMapPin className="text-gray-400" />
        <span>
          {appointment.space.Address}, {appointment.space.City}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-between px-2 mt-3">
        {/* Chat Button */}
        <button className="flex items-center w-full justify-center gap-1 p-2 bg-[#EA4B8A] text-white rounded-lg text-sm">
          <BiChat className="text-lg" /> Chat
        </button>
        {/* Favorite Button */}
        <button className="flex items-center w-full justify-center gap-1 p-2 bg-red-400 text-white rounded-lg text-sm">
          <FiTrash className="text-lg" /> Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
