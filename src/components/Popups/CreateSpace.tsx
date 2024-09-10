import { FiX } from "react-icons/fi";
import { CreateSpacePopupAtom } from "../../store/Popup";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import Avatar from "../../assets/avatar.jpg";
import { FiLoader } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

const CreateSpace = () => {
  const setCreateSpacePopup = useSetRecoilState(CreateSpacePopupAtom);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
    handleImageUpload();
  };

  const handleImageUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default"); // Replace with your upload preset
    formData.append("cloud_name", "dri5u2nqb"); // Replace with your Cloudinary cloud name

    setUploading(true);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dri5u2nqb/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
      console.log("Image URL:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const [selectedTime, setSelectedTime] = useState("");

  const times = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Awesome Shop");

  const handleSelect = (value: any) => {
    setSelectedValue(value); // Update the selected value
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className=" fixed flex h-[100vh]  p-5 gap-2 w-screen top-0 left-0 justify-center items-center  z-10 bg-[rgba(34,34,34,0.5)]">
      <div className=" flex w-full max-w-[80vw] shadow-4xl flex-col gap-4 h-fit rounded-lg bg-[#121212] ">
        <h1 className=" text-left text-2xl font-semibold p-5">
          Create Space
          <FiX
            className="float-right text-2xl cursor-pointer"
            onClick={() => setCreateSpacePopup(false)}
          />
        </h1>
        <div className="flex flex-col gap-[5vh] ">
          <div className="flex justify-between w-full">
            <div className="flex w-full flex-col gap-2 px-5">
              <label htmlFor="profession" className="font-medium ">
                Your Profession
              </label>
              <div className="dropdown">
                <input
                  placeholder={selectedValue}
                  type="text"
                  value={selectedValue}
                  onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown
                  readOnly
                  className="w-full text-white p-2 rounded-md shadow-5xl bg-[#1a1a1a] focus:outline-none border-gray-600"
                />
                {isOpen && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-[#1a1a1a] rounded-md shadow-4xl mt-2 text-white z-[1] w-full p-2 "
                  >
                    <li onClick={() => handleSelect("Barber")}>
                      <a>Barber</a>
                    </li>
                    <li onClick={() => handleSelect("Other")}>
                      <a>Other</a>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full gap-2 px-5">
              <label htmlFor="Space Name" className=" font-medium ">
                Shop Name
              </label>
              <input
                placeholder="Awesome Shop"
                type="text"
                className="w-full text-white p-2 rounded-md  shadow-5xl bg-[#1a1a1a] focus:outline-none border-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 mt-[2vh] px-5">
          <label htmlFor="Space Name" className=" font-medium ">
            Upload Image
          </label>
          <div className="flex w-full mt-[2vh] items-center gap-2">
            <div className="w-[4vw] h-[4vw] bg-white rounded-[50%]">
              <img
                src={imageUrl ? imageUrl : Avatar}
                alt="avatar"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <div>
              <input
                type="file"
                id="fileInput"
                className="file-input "
                onChange={handleImageChange}
                style={{ display: "none" }} // Hide the default file input
              />
              <label
                htmlFor="fileInput"
                className="custom-file-upload bg-[#1a1a1a]  p-2 rounded-md shadow-4xl"
              >
                {!imageUrl ? "Choose File" : "Change"}
              </label>
            </div>
            <button onClick={handleImageUpload} disabled={uploading}>
              {uploading ? <FiLoader /> : imageUrl ? <FiCheck /> : ""}
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 mt-[2vh] px-5">
          <label htmlFor="location" className="font-medium ">
            Your Location
          </label>
          <div className="flex flex-col gap-2">
            {/* State Field */}
            <input
              placeholder="State"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full  p-2 rounded-md  bg-[#1a1a1a] shadow-5xl focus:outline-none border-gray-600"
            />

            {/* City Field */}
            <input
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full  p-2 rounded-md bg-[#1a1a1a] shadow-5xl  focus:outline-none border-gray-600"
            />

            {/* Area Field */}
            <input
              placeholder="Area"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full  p-2 rounded-md bg-[#1a1a1a] shadow-5xl  focus:outline-none border-gray-600"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-[2vh] gap-2 px-5">
          <label htmlFor="time" className="font-medium ">
            Your Timing
          </label>
          <div className="flex gap-2">
            {/* Dropdown for Time From */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">From</label>
              <select
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="w-full cursor-pointer  p-2 rounded-md bg-[#1a1a1a] shadow-5xl  focus:outline-none border-2 border-blue-500 hover:border-red-500"
              >
                <option value="" disabled>
                  Select time
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown for Time To */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">To</label>
              <select
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="w-full cursor-pointer  p-2 rounded-md bg-[#1a1a1a] shadow-5xl  focus:outline-none border-2 border-blue-500 hover:border-red-500"
              >
                <option value="" disabled>
                  Select time
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
         
        </div>
        <div className="w-full p-3">
        <button
            className="bg-[#F9F6EE]  bottom-0 w-full text-black p-2 rounded-md"
            onClick={()=>setCreateSpacePopup(true)}
          >
            Create Space
          </button>
      </div>
      </div>
    </div>
  );
};

export default CreateSpace;
