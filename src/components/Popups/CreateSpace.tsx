import { FiX, FiLoader, FiCheck } from "react-icons/fi";
import { CreateSpacePopupAtom, LoadingAtom } from "../../store/Popup";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";
import Avatar from "../../assets/avatar.jpg";

export const times = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const CreateSpace = () => {
  const setCreateSpacePopup = useSetRecoilState(CreateSpacePopupAtom);
  const [formData, setFormData] = useState({
    image: null,
    imageUrl: "",
    uploading: false,
    timeFrom: "",
    timeTo: "",
    state: "",
    city: "",
    area: "",
    shopName: "",
    profession: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Barber");
  const [isLoading , setIsLoading] = useRecoilState(LoadingAtom);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "timeTo") {
      if (formData.timeFrom.length > 0 && value < formData.timeFrom) {
        return alert("Please select correct time");
      }
    }
    if (name === "timeFrom") {
      if (formData.timeTo.length > 0 && value > formData.timeTo) {
        return alert("Please select correct time");
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: imageFile }));
    handleImageUpload(imageFile);
  };

  const handleImageUpload = async (imageFile: File | null) => {
    if (!imageFile) return;
    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);

    setFormData((prevData) => ({ ...prevData, uploading: true }));

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/upload", formDataImage, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
          authorization: localStorage.getItem("token") as string,
        },
      });
      setIsLoading(false);
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: response.data.secure_url.split("?")[0],
        uploading: false,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setFormData((prevData) => ({ ...prevData, uploading: false }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/spaces/CreateSpace`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token") as string,
          },
          body: JSON.stringify({
            Profession: selectedValue,
            ShopName: formData.shopName,
            State: formData.state,
            City: formData.city,
            Address: formData.area,
            Timing: formData.timeFrom + "-" + formData.timeTo,
            ImageUrl: formData.imageUrl,
          }),
        }
      );

      const data = await res.json();
      setIsLoading(false);
      if (!data.Status) {
        return alert("Something went wrong");
      }
      setCreateSpacePopup(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSelect = (value: any) => {
    setSelectedValue(value); // Update the selected value
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="fixed flex h-[100vh] p-5 gap-2 w-screen top-0 left-0 justify-center items-center z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="flex w-full max-w-[80vw] shadow-4xl flex-col gap-4 h-fit rounded-lg bg-[#1a1a1a] ">
        <h1 className="text-left text-2xl font-semibold p-5">
          Create Space
          <FiX
            className="float-right text-2xl cursor-pointer"
            onClick={() => setCreateSpacePopup(false)}
          />
        </h1>
        <div className="flex flex-col gap-[5vh]">
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
                  className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
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
              <label htmlFor="shopName" className="font-medium">
                Shop Name
              </label>
              <input
                name="shopName"
                placeholder="Awesome Shop"
                type="text"
                value={formData.shopName}
                onChange={handleInputChange}
                className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 mt-[2vh] px-5">
          <label htmlFor="image" className="font-medium">
            Upload Image
          </label>
          <div className="flex w-full mt-[2vh] items-center gap-2">
            <div className="w-[4vw] h-[4vw] bg-white rounded-[50%]">
              <img
                src={formData.imageUrl ? formData.imageUrl : Avatar}
                alt="avatar"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <input
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              className="custom-file-upload bg-[#1a1a1a] p-2 rounded-md shadow-4xl"
            >
              {!formData.imageUrl ? "Choose File" : "Change"}
            </label>
            <button
              onClick={() => handleImageUpload(formData.image)}
              disabled={formData.uploading}
            >
              {formData.uploading ? (
                <FiLoader />
              ) : formData.imageUrl ? (
                <FiCheck />
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 mt-[2vh] px-5">
          <label htmlFor="location" className="font-medium">
            Your Location
          </label>
          <div className="flex gap-2">
            <input
              name="state"
              placeholder="State"
              type="text"
              value={formData.state}
              onChange={handleInputChange}
              className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
            />
            <input
              name="city"
              placeholder="City"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
            />
            <input
              name="area"
              placeholder="Area"
              type="text"
              value={formData.area}
              onChange={handleInputChange}
              className="bg-[#F3F3F3] text-black w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-[2vh] gap-2 px-5">
          <label htmlFor="time" className="font-medium">
            Your Timing
          </label>
          <div className="flex gap-2">
            <select
              name="timeFrom"
              value={formData.timeFrom}
              onChange={handleInputChange}
              className="w-full cursor-pointer p-2 rounded-md bg-[#1a1a1a] shadow-5xl border-2 border-blue-500 hover:border-red-500"
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
            <select
              name="timeTo"
              value={formData.timeTo}
              onChange={handleInputChange}
              className="w-full cursor-pointer p-2 rounded-md bg-[#1a1a1a] shadow-5xl border-2 border-blue-500 hover:border-red-500"
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
        <div className="w-full p-3">
          <button
            className="bg-[#EA4B8A] hover:bg-[#1a1a1a] w-full p-[2.2vh] font-semibold rounded-md"
            onClick={handleSubmit}
          >
            Create Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSpace;
