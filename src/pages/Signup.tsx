import { useState } from "react";
import banner from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [Name, setName] = useState<string | null>(null);
  const [Username, setUsername] = useState<string | null>(null);
  const [Email, setEmail] = useState<string | null>(null);
  const [Password, setPassword] = useState<string | null>(null);
  const [Terms, setTerms] = useState<boolean>(false);
  const [Warning, setWarning] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!Name || !Username || !Email || !Password || !Terms) {
      setWarning("Please fill all the fields and accept the terms");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: Name,
            username: Username,
            email: Email,
            password: Password,
          }),
        }
      );
      const data = await res.json();
      if (data.Status === false) {
        setWarning(data.error);
        return;
      }
      navigate("/Login");
    } catch (error) {
      return setWarning("Internal Server Error");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("USER");

  const handleSelect = (value: any) => {
    setSelectedValue(value); // Update the selected value
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="flex absolute top-0">
      <div className="md:flex hidden cursor-pointer  text-[3vh] w-[40vw] h-screen font-bold ">
        <img src={banner} className=" object-cover w-full h-full" alt="logo" />
      </div>
      <div className="md:w-[60vw] w-full justify-center items-center  flex-col flex h-[100vh]">
        <div className="md:px-[12vw]  m-[5vh] h-fit">
          <h1 className=" font-black text-[3.5vh] mb-[3vh]">
            Sign up to SlotIn
          </h1>
          {Warning && (
            <h2 className="text-red-400 font-medium text-[2vh] pt-[2vh] pb-[3vh]">
              • {Warning}
            </h2>
          )}
          <div className="flex flex-col gap-[4vh]">
            <div className="flex flex-col gap-[4vh] md:flex-row justify-between">
              <div>
                <h1 className="font-black text-[2.1vh] mb-[0.7vh]">Name</h1>
                <input
                  type="text"
                  placeholder="eg. John Doe"
                  className="bg-[#F3F3F3] w-full font-medium text-sm  focus:outline-none p-[1.6vh] rounded-md"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex w-full flex-col gap-2 px-5">
                <label htmlFor="profession" className="font-medium ">
                  Type
                </label>
                <div className="dropdown ">
                  <input
                    placeholder={selectedValue}
                    type="text"
                    value={selectedValue}
                    onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown
                    readOnly
                    className="bg-[#F3F3F3] cursor-pointer w-full font-medium text-black text-sm  focus:outline-none p-[1.6vh] rounded-md"
                  />
                  {isOpen && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-[#1a1a1a] rounded-md shadow-4xl mt-2 text-white z-[1] w-full p-2 "
                    >
                      <li onClick={() => handleSelect("USER")}>
                        <a>USER</a>
                      </li>
                      <li onClick={() => handleSelect("BUSINESS")}>
                        <a>BUSINESS</a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-black text-[2.1vh] mb-[0.7vh]">Email</h1>
              <input
                type="text"
                placeholder="eg. test@gmail.com"
                className="bg-[#F3F3F3] w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <h1 className="font-black text-[2.1vh] mb-[0.7vh]">Password</h1>
              <input
                type="text"
                placeholder="6+ characters"
                className="bg-[#F3F3F3] w-full text-sm font-medium focus:outline-none p-[1.6vh] rounded-md"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <span className=" gap-2 text-sm font-medium  text-left ">
                Already a member ?{" "}
                <a
                  className="text-blue-400 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </a>
              </span>
            </div>
            <button
              className="bg-[#EA4B8B] w-fit py-2 px-[2vw] text-white rounded-lg"
              onClick={() => handleSignup()}
            >
              Create Account
            </button>
            <p className="text-[1.5vh] md:max-w-[20vw] text-gray-700 font-medium">
              This site is protected by reCAPTCHA and the Google{" "}
              <a className="text-blue-400 text-[1.7vh]">Privacy Policy</a> and{" "}
              <a className="text-blue-400 text-[1.7vh]">Terms of Service</a>{" "}
              apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
