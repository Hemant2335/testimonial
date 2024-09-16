import { useEffect, useState } from "react";
import BookAppointment from "../components/Popups/BookAppointment";
import { useNavigate } from "react-router-dom";
import { FiMeh } from "react-icons/fi";

const OfflineAppointment = () => {
  const [isBookingCardOpen, setisBookingCardOpen] = useState(false);
  const [MobileNumber, setMobileNumber] = useState("");
  const [Warning, setWarning] = useState("");
  const [Name, setName] = useState("");
  const [Space, setSpace] = useState(null);
  const navigate = useNavigate();

  const fetchSpaceDetails = async () => {
    const spaceId = window.location.pathname.split("/")[2];
    if (!spaceId) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/spaces/GetSpaceDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            spaceId: spaceId,
          }),
        }
      );

      const data = await res.json();
      if (!data.Status) {
        return alert("Something went wrong");
      }
      if (data.space == null) {
        alert("Invalid Space Id");
        navigate("/");
      }
      setSpace(data.space);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    fetchSpaceDetails();
  }, []);

  const handleBookAppointment = () => {
    if (!Name || !MobileNumber) {
      setWarning("Please Fill all the Fields");
    } else {
      setWarning(""); // Clear the warning if fields are filled
      setisBookingCardOpen(true);
    }
  };

  return (
    <>
      {isBookingCardOpen && Space && Name && MobileNumber && (
        <BookAppointment
          isOpen={isBookingCardOpen}
          setIsOpen={setisBookingCardOpen}
          space={Space}
          Name={Name}
          MobileNumber={MobileNumber}
          isOffline={true}
        />
      )}

      <div className="w-full flex flex-col gap-5 items-center justify-center h-[85vh]">
        <h1 className="text-xl font-semibold">Book Offline Appointment</h1>
        {Warning.length > 0 && (
          <h1 className="flex items-center text-red-400 font-medium gap-2">
            <FiMeh /> {Warning}
          </h1>
        )}
        <div className="flex w-fit bg-[#121212] p-[4vh] shadow-4xl rounded-lg flex-col justify-center  gap-[4vh]">
          <div>
            <h1 className="font-black text-[2.1vh] mb-[0.7vh]">
              Mobile Number
            </h1>
            <input
              type="text"
              placeholder="eg. 9111xxxxxx"
              className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
          </div>
          <div>
            <h1 className="font-black text-[2.1vh] mb-[0.7vh]">Name</h1>
            <input
              type="text"
              placeholder="eg. Nishant"
              className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-[#EA4B8B] w-fit py-2 px-[2vw] text-white rounded-lg"
            onClick={handleBookAppointment}
          >
            Book
          </button>
          <p className="text-[1.5vh] md:max-w-[20vw] text-gray-700 font-medium">
            This site is protected by reCAPTCHA and the Google{" "}
            <a className="text-blue-400 text-[1.7vh]">Privacy Policy</a> and{" "}
            <a className="text-blue-400 text-[1.7vh]">Terms of Service</a> apply
          </p>
        </div>
      </div>
    </>
  );
};

export default OfflineAppointment;
