import  { useEffect, useState } from "react";
import AppointmentCard from "../TestiCards/AppointmentCard";

const Appointments = () => {
  const [Appointments, setAppointments] = useState([]);
  const [IsActive, setIsActive] = useState(true);

  const FetchAppointments = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/explore/GetUserAppointments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") as string,
          },
        }
      );

      const data = await res.json();
      setAppointments(data.appointments);
      if (!data.Status) {
        return alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    FetchAppointments();
  }, []);

  return (
    <div className="w-full relative h-[50vh]  md:h-full overflow-y-auto no-scrollbar ">
      <div className="flex items-center justify-between ">
        <h1 className="mt-3 md:text-xl md:flex-row md:gap-2 flex flex-col  font-bold ">
          {IsActive ? "Upcoming" : "Previous"} 
          <span>Appointments</span>
        </h1>

        <div className="flex md:flex-row flex-col gap-2">
          <button
            onClick={() => setIsActive(true)}
            className={`${
              IsActive ? "bg-white text-black" : "bg-[#1a1a1a]"
            } px-2 py-1 rounded-md font-medium`}
          >
            Active
          </button>
          <button
            onClick={() => setIsActive(false)}
            className={`${
              !IsActive ? "bg-white text-black" : "bg-[#1a1a1a]"
            } px-2 py-1 rounded-md font-medium`}
          >
            History
          </button>
        </div>
      </div>
      {Appointments.length === 0 ? (
        <div className="flex w-full h-full items-center justify-center ">
          <button className="bg-[#F9F6EE] w-fit text-black p-2 rounded-md">
            Nothing To Show
          </button>
        </div>
      ) : IsActive ? (
        <div className="md:flex  w-full flex-wrap gap-2 mt-5">
          {Appointments.map(
            (appointment: any) =>
              appointment.status === "ACTIVE" && (
                <AppointmentCard appointment={appointment} />
              )
          )}
        </div>
      ) : (
        <div className="md:flex-row flex flex-col w-full md:flex-wrap gap-2 mt-5">
          {Appointments.map((appointment: any) => (
             appointment.status === "EXPIRED" && (
              <AppointmentCard appointment={appointment} />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
