import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";
import "./index.css";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;
