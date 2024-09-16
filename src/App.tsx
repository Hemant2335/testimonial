import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import OfflineAppointment from "./pages/OfflineAppointment";
import { useRecoilState } from "recoil";
import { userState } from "./store/User";
import "./index.css";
import { useEffect } from "react";

function App() {
  const [User, setUser] = useRecoilState(userState);

  const getUser = async (token: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/getuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      const data = await res.json();
      if (!data.Status) {
        alert("Something went wrong");
        if (!useLocation().pathname.includes("/Login"))
          window.location.href = "/Login";
      }
      setUser(data.user);
    } catch (error) {
      alert("Internal Server Error");
      if (!useLocation().pathname.includes("/Login"))
        window.location.href = "/Login";
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") && !User.name) {
      getUser(localStorage.getItem("token") as string);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
      <div className="no-scrollbar overflow-y-auto min-h-screen ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Explore" element={<Explore/>} />
          <Route path="/OfflineAppointment/:spaceId" element={<OfflineAppointment/>} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
