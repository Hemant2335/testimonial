import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { times } from "../Popups/CreateSpace";

type BookAppointmentProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  space: {
    id: string;
    Profession: string;
    ShopName: string;
    ImageUrl: string;
    State: string;
    City: string;
    Address: string;
    Timing: string;
  };
};

const BookAppointment = (props: BookAppointmentProps) => {
  const handleBookAppointment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/explore/BookAppointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") as string,
          },
          body: JSON.stringify({
            SpaceId: props.space.id,
            Time: Time,
          }),
        }
      );

      const data = await res.json();
      if (!data.Status) {
        return alert("Something went wrong");
      }
      props.setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [Time, setTime] = useState("");
  const [Slots, setSlots] = useState<String[]>([]);

  const FindAvailableSlots = async () => {
    try {
      const TimeFrom = parseInt(props.space.Timing.split("-")[0].split(":")[0]);
      const TimeTo = parseInt(props.space.Timing.split("-")[1].split(":")[0]);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/explore/FindAvailableSlots`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") as string,
          },
          body: JSON.stringify({
            timeFrom: TimeFrom,
            timeTo: TimeTo,
            SpaceId: props.space.id,
          }),
        }
      );
      const data = await res.json();
      if (!data.Status) {
        return alert("Something went wrong");
      }
      setSlots(data.slots);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    FindAvailableSlots();
  }, []);

  return (
    <div className="fixed flex h-[100vh] p-5 gap-2 w-screen top-0 left-0 justify-center items-center z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="flex  w-[35vw] shadow-4xl flex-col gap-4 h-fit rounded-lg bg-[#1a1a1a] ">
        <h1 className="text-left flex text-gray-300  w-full justify-between  items-center gap-4 text-2xl font-semibold pt-5 px-5">
          <span className="flex gap-1 items-center">Book Appointment for <p className="text-[#EA4B8A]">{props.space.ShopName}</p></span>
          <FiX
            className="float-right text-white text-2xl text-right cursor-pointer"
            onClick={() => props.setIsOpen(false)}
          />
        </h1>
        <div className="flex w-full flex-col gap-2 px-5 mt-4">
          <label htmlFor="time" className="font-medium">
            Select Available Slot
          </label>
          <div className="flex items-center gap-2">
            <span className="w-[1vw] h-[1vw] rounded-[50%] bg-green-400"></span>
            <span className="text-sm font-semibold">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[1vw] h-[1vw] rounded-[50%] bg-red-400"></span>
            <span className="text-sm font-semibold">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[1vw] h-[1vw] rounded-[50%] bg-blue-400"></span>
            <span className="text-sm font-semibold">Selected</span>
          </div>

          <div className="flex flex-wrap gap-2 w-full mt-2 mb-3">
            {Slots?.map((slot: any, index: number) => (
              <button
                key={index}
                className={`text-sm w-fit p-2 font-semibold rounded-md 
        ${
          Time === slot.time
            ? "bg-blue-400"
            : slot.available
            ? "bg-green-400"
            : "bg-red-400"
        }
        hover:bg-blue-400`}
                onClick={() => setTime(slot.time)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full p-3">
          <button
            className="bg-[#EA4B8A]  w-full p-2 font-semibold rounded-md"
            onClick={handleBookAppointment}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
