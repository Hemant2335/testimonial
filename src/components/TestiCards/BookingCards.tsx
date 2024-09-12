import { useState } from "react";
import { BiHeart, BiChat } from "react-icons/bi";
import BookAppointment from "../Popups/BookAppointment";
import { userState } from "../../store/User";
import { useRecoilValue } from "recoil";
import ViewAppointment from "../Popups/ViewAppointment";

type Space = {
  space: {
    id: string;
    Profession: string;
    ShopName: string;
    ImageUrl: string;
    State: string;
    City: string;
    Address: string;
    Timing: string;
    userId: string;
  };
};

const BookingCard = (space: Space) => {
  const [isBookingCardOpen, setisBookingCardOpen] = useState(false);
  const [isViewAppointmentPopupOpen, setisViewAppointmentPopupOpen] =
    useState(false);
  const user = useRecoilValue(userState);
  return (
    <>
      {isBookingCardOpen && (
        <BookAppointment
          isOpen={isBookingCardOpen}
          setIsOpen={setisBookingCardOpen}
          space={space.space}
        />
      )}
      {isViewAppointmentPopupOpen && (
        <ViewAppointment
          isOpen={isViewAppointmentPopupOpen}
          setIsOpen={setisViewAppointmentPopupOpen}
          space={space.space}
        />
      )}
      <div className="w-[20vw] flex flex-col gap-3 h-fit shadow-4xl bg-[#1E201E] rounded-lg p-3">
        <div className="flex w-full justify-between px-2 items-center gap-2">
          <div className="flex w-full items-center gap-2">
            <div className="w-[3vw] h-[3vw] bg-white rounded-[50%]">
              <img
                src={space.space.ImageUrl}
                alt="avatar"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <div>
              <h1 className=" font-semibold text-lg">{space.space.ShopName}</h1>
              <span className="text-[1.1vh] border-[1.1px] p-1 rounded-lg border-gray-400">
                @{space.space.Profession}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <BiChat className="text-[3vh]" />
            <BiHeart className="text-[3vh]" />
          </div>
        </div>

        <div className="flex flex-col gap-2 my-[2vh]">
          <span className=" font-medium bg-[#3C3D37] p-2 rounded-md flex justify-between items-center">
            <p>Location </p>
            <p className="bg-[#EA4B8B]  text-gray-700 text-sm font-medium  rounded-xl px-2">
              {space.space.City}
            </p>
          </span>
          <span className=" font-medium bg-[#3C3D37] p-2 rounded-md flex justify-between items-center">
            <p>Timing </p>
            <p className="bg-[#F9F6EE] text-gray-700 text-sm font-medium  rounded-xl px-2">
              {space.space.Timing}
            </p>
          </span>
          <span className=" font-medium bg-[#3C3D37] p-2 rounded-md flex justify-between items-center">
            <p>Payment </p>
            <p className="bg-[#F9F6EE] text-gray-700 text-sm font-medium  rounded-xl px-2">
              Cash
            </p>
          </span>
          <span className=" font-medium bg-[#3C3D37] p-2 rounded-md flex justify-between items-center">
            <p>Price </p>
            <p className="bg-[#EA4B8B] text-gray-700 text-sm font-medium  rounded-xl px-2">
              &#8377;50
            </p>
          </span>
        </div>
        {user.id === space.space.userId ? (
          <button
            className="bg-[#F9F6EE]  shadow-5xl  w-full text-gray-700 text-sm  p-2 font-medium rounded-md"
            onClick={() => setisViewAppointmentPopupOpen(true)}
          >
            View Appointments
          </button>
        ) : (
          <button
            className="bg-[#F9F6EE]  shadow-5xl  w-full text-gray-700 text-sm  p-2 font-medium rounded-md"
            onClick={() => setisBookingCardOpen(true)}
          >
            Book Appointment
          </button>
        )}
      </div>
    </>
  );
};

export default BookingCard;
