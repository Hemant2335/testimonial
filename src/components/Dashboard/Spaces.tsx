import { useEffect, useState } from "react";
import { CreateSpacePopupAtom } from "../../store/Popup";
import { useSetRecoilState } from "recoil";
import SpaceCard from "../TestiCards/SpaceCard";

const Spaces = () => {
  const [Spaces, setSpaces] = useState([]);
  const setCreateSpacePopup = useSetRecoilState(CreateSpacePopupAtom);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/spaces/GetSpaces`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token") as string,
            },
          }
        );
        const data = await res.json();
        setSpaces(data.spaces);
      } catch (error) {
        console.log(error);
        alert("Internal Server Error");
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div className="w-full overflow-y-auto no-scrollbar  relative h-full">
      <button
        className="bg-[#F9F6EE] absolute right-0 w-fit text-black p-2 rounded-md"
        onClick={() => setCreateSpacePopup(true)}
      >
        Create Space
      </button>
      {Spaces.length > 0 ? (
        <div>
          <div className="md:flex pt-[8vh] flex-wrap gap-5">
            {Spaces.map((space: any) => (
              <SpaceCard space={space} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full items-center justify-center ">
          <button
            className="bg-[#F9F6EE] w-fit text-black p-2 rounded-md"
            onClick={() => setCreateSpacePopup(true)}
          >
            Nothing To Show
          </button>
        </div>
      )}
    </div>
  );
};

export default Spaces;
