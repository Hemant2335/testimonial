import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { LoadingAtom } from "../../store/Popup";
import { useRecoilState } from "recoil";

type ViewAppointmentProps = {
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

const ViewAppointment = (props: ViewAppointmentProps) => {
  const [isLoading , setIsLoading] = useRecoilState(LoadingAtom);
  const FindSpaceAppointments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/spaces/GetSpaceAppointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") as string,
          },
          body: JSON.stringify({
            spaceId: props.space.id,
          }),
        }
      );
      const data = await res.json();
      setIsLoading(false);
      if (!data.Status) {
        return alert("Something went wrong");
      }
      AddToTimeline(data.appointments);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    FindSpaceAppointments();
  }, []);

  const AddToTimeline = (slot: any) => {
    if (props.space) {
      const OfflineAppointment = slot.offlineAppointments;
      const appointments = slot.appointments;

      const fromtimehrs = parseInt(
        props.space.Timing.split("-")[0].split(":")[0]
      );
      const fromtimemin = parseInt(
        props.space.Timing.split("-")[0].split(":")[1]
      );
      const totimehrs = parseInt(
        props.space.Timing.split("-")[1].split(":")[0]
      );
      const totimemin = parseInt(
        props.space.Timing.split("-")[1].split(":")[1]
      );
      const El = document.getElementById("TimeLineTime");
      const El2 = document.getElementById("TimeLineSlots");
      if (!El) return;
      if (!El2) return;
      El.innerHTML = ""; // Clear the previous timeline
      El2.innerHTML = ""; // Clear the previous appointments

      let currentHour = fromtimehrs;
      let currentMinute = fromtimemin;

      while (
        currentHour < totimehrs ||
        (currentHour === totimehrs && currentMinute < totimemin)
      ) {
        let nextMinute = currentMinute + 15;
        let nextHour = currentHour;

        // Check if the next block of 15 minutes spills over to the next hour
        if (nextMinute >= 60) {
          nextMinute = nextMinute - 60;
          nextHour = currentHour + 1;
        }

        // Format time strings to be always two digits (e.g., 09:00)
        const currentTimeFormatted = `${currentHour
          .toString()
          .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
        const nextTimeFormatted = `${nextHour
          .toString()
          .padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`;

        const isSlotUser = appointments.filter((s: any) => {
          if (currentTimeFormatted.includes(s.fromtime)) {
            return s.user;
          }
        });
        const isOfflineSlotUser = OfflineAppointment.filter((s: any) => {
          if (currentTimeFormatted.includes(s.fromtime)) {
            return { phone: s.phone, name: s.name };
          }
        });
        if (isSlotUser.length > 0) {
          El2.innerHTML += `
          <div class="w-full flex gap-2 p-3 bg-[#1a1a1a] font-medium shadow-4xl rounded-md">
            <h1>${isSlotUser[0].user.name}</h1>
            <p class = "text-blue-400">#${isSlotUser[0].user.email}</p>
          </div>
        `;
          El.innerHTML += `
        <div class="md:w-full w-fit p-3 bg-green-400 whitespace-nowrap font-medium shadow-4xl rounded-md">
          <h1>${currentTimeFormatted} - ${nextTimeFormatted}</h1>
        </div>
      `;
        } else if (isOfflineSlotUser.length > 0) {
          El2.innerHTML += `
          <div class="w-full flex gap-2 p-3  bg-[#1a1a1a] font-medium shadow-4xl rounded-md">
            <h1>${isOfflineSlotUser[0].name}</h1>
            <p class = "text-blue-400">#${isOfflineSlotUser[0].phone}</p>
          </div>
        `;
          El.innerHTML += `
        <div class="md:w-full w-fit p-3 bg-blue-400 whitespace-nowrap font-medium shadow-4xl rounded-md">
          <h1>${currentTimeFormatted} - ${nextTimeFormatted}</h1>
        </div>
      `;
        } else {
          El2.innerHTML += `
          <div class="w-full p-3 bg-[#1a1a1a] font-medium shadow-4xl rounded-md">
            <div class="flex flex-col gap-2">
              <p class="text-white">No Appointment</p>`;
          El.innerHTML += `
              <div class="md:w-full w-fit p-3 bg-red-400 whitespace-nowrap font-medium shadow-4xl rounded-md">
                <h1>${currentTimeFormatted} - ${nextTimeFormatted}</h1>
              </div>
            `;
        }
        // Update current time for the next iteration
        currentHour = nextHour;
        currentMinute = nextMinute;
      }
    }
  };
  return (
    <div className="fixed flex h-[90vh] p-5 gap-2 w-screen top-0 left-0 justify-center items-center z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="flex p-2 w-full shadow-4xl flex-col gap-4 h-full rounded-lg bg-[#1a1a1a] ">
        <h1 className="text-left flex text-gray-300  w-full justify-between  items-center gap-4 text-2xl font-semibold pt-5 px-5">
          <span className="md:flex gap-1 items-center">
            Appointment TimeLine for{" "}
            <p className="text-[#EA4B8A]">{props.space.ShopName}</p>
          </span>
          <FiX
            className="float-right text-white text-2xl text-right cursor-pointer"
            onClick={() => props.setIsOpen(false)}
          />
        </h1>
        <div className="md:flex items-center gap-2 px-5">
        <div className="flex items-center gap-2">
            <span className="w-[1vw] h-[1vw] rounded-[50%] bg-green-400"></span>
            <span className="text-sm font-semibold">Online Appointment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[1vw] h-[1vw] rounded-[50%] bg-red-400"></span>
            <span className="text-sm font-semibold">No Appointment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-[1vw] h-[1vw] rounded-[50%] bg-blue-400"></span>
            <span className="text-sm font-semibold">Offline Appointment</span>
          </div>
          <button
                className="bg-[#1a1a1a1a] hover:bg-white hover:text-black shadow-4xl flex float-right w-fit my-2 px-3 py-1 text-white rounded-lg"
                onClick={() => FindSpaceAppointments()}
              >
                Refresh
              </button>
          </div>
          
        <div className="flex w-full h-full gap-2 overflow-y-auto no-scrollbar ">
          <div
            id="TimeLineTime"
            className="md:w-[20vw]  flex flex-col gap-5 h-full  rounded-md p-3"
          >
            {/* // Timeline Values like 9-9:15 AM, 9:15-9:30 AM, etc. */}
          </div>
          <div
            id="TimeLineSlots"
            className="w-full  flex flex-col gap-5 h-full  rounded-md p-3"
          >
            {/* // Appointment Details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
