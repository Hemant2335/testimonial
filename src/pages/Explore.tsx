import { useEffect, useState } from "react";
import BookingCard from "../components/TestiCards/BookingCards";
import { LoadingAtom } from "../store/Popup";
import { useRecoilState } from "recoil";
import { set } from "@cloudinary/url-gen/actions/variable";

const Explore = () => {
  const [Booking, setBooking] = useState([]);
  const [isLoading , setIsLoading] = useRecoilState(LoadingAtom);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/spaces/GetAllSpaces`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token") as string,
            },
          }
        );
        const data = await res.json();
        setIsLoading(false);
        setBooking(data.spaces);
      } catch (error) {
        console.log(error);
        alert("Internal Server Error");
      }
    };

    fetchBookings();
  }, []);

  // const filters = [{"Profession" : []}, {"location" : []}, {"Price" : []}, {"Time" :[
  //   "6:00 AM",
  //   "7:00 AM",
  //   "8:00 AM",
  //   "9:00 AM",
  //   "10:00 AM",
  //   "11:00 AM",
  //   "12:00 PM",
  //   "1:00 PM",
  //   "2:00 PM",
  //   "3:00 PM",
  //   "4:00 PM",
  //   "5:00 PM",
  //   "6:00 PM",
  //   "7:00 PM",
  //   "8:00 PM",
  // ]}];

  return (
    <div className="mt-5 p-[2vw]">
      <h1 className="text-3xl font-semibold">Explore Services</h1>
      <div></div>
      <div className="mt-[5vh]  gap-5 md:flex-row flex flex-col flex-wrap">
        {Booking.map((space: any) => (
          <BookingCard space={space} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
