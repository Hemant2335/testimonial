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
  const [imageUrl, setImageUrl] = useState("");

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

  return (
    <div className=" fixed flex h-[100vh]  p-5 gap-2 w-screen top-0 left-0 justify-center items-center  z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="w-[50vw] max-w-[30vw] h-full bg-[#F9F6EE] rounded-lg"></div>
      <div className="w-full flex flex-col gap-4 h-full rounded-lg bg-black border-2 border-gray-700">
        <h1 className="text-white text-left text-2xl font-semibold p-5">
          Create Space
          <FiX
            className="float-right text-2xl cursor-pointer"
            onClick={() => setCreateSpacePopup(false)}
          />
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between w-full">
            <div className="flex  w-full flex-col gap-2 px-5">
              <label htmlFor="Space Name" className=" font-medium">
                Space Name
              </label>
              <input
                placeholder="My Space"
                type="text"
                className="w-full p-2 rounded-md border-2 focus:outline-none border-gray-600"
              />
            </div>
            <div className="flex flex-col w-full gap-2 px-5">
              <label htmlFor="Space Name" className=" font-medium">
                Header Title
              </label>
              <input
                placeholder="Awesome Space"
                type="text"
                className="w-full p-2 rounded-md border-2 focus:outline-none border-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 mt-2 px-5">
          <label htmlFor="Space Name" className=" font-medium">
            Upload Logo
          </label>
          <div className="flex w-full items-center gap-2">
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
                className="file-input"
                onChange={handleImageChange}
                style={{ display: "none" }} // Hide the default file input
              />
              <label
                htmlFor="fileInput"
                className="custom-file-upload bg-white border-2 p-2 rounded-md text-black"
              >
                {!imageUrl ? "Choose File" : "Change"}
              </label>
            </div>
            <button onClick={handleImageUpload} disabled={uploading}>
              {uploading ? <FiLoader /> : imageUrl ? <FiCheck /> : ""}
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2 px-5">
          <label htmlFor="Space Name" className=" font-medium">
            Your Message
          </label>
          <textarea
            placeholder="Awesome Space"
            rows={5}
            className="w-full shadow-4xl text-left p-2 rounded-md border-2 focus:outline-none border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSpace;
