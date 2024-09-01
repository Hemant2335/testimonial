import { useState } from "react";
import { CreateSpacePopupAtom } from "../../store/Popup";
import { useSetRecoilState } from "recoil";

const Spaces = () => {
  const [Spaces, setSpaces] = useState([]);
  const setCreateSpacePopup = useSetRecoilState(CreateSpacePopupAtom);
  const fetchSpaces = async () => {
    const response = await fetch("http://localhost:5000/spaces");
    const data = await response.json();
    setSpaces(data);
  };

  return (
    <div className="w-full h-full">
      {Spaces.length > 0 ? (
        <div>
          <button
            onClick={fetchSpaces}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Fetch Spaces
          </button>
          <div className="flex flex-wrap gap-5">
            {Spaces.map((space: any) => (
              <div key={space.id} className="bg-[#121212] p-5 rounded-lg">
                <h1 className="text-white text-xl">{space.name}</h1>
                <p className="text-white">{space.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full items-center justify-center ">
          <button
            className="bg-[#F9F6EE] w-fit text-black p-2 rounded-md"
            onClick={()=>setCreateSpacePopup(true)}
          >
            Create Space
          </button>
        </div>
      )}
    </div>
  );
};

export default Spaces;
