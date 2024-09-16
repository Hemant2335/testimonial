import { FiX } from "react-icons/fi";
import QRCode from "react-qr-code";

type QRProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    space: {
      id: string;
      Profession: string;
      ShopName: string;
      ImageUrl: string;
      State: string;
      City: string;
      Address: string;
      Timing: string;
    };
  };


const QrPopup = (props : QRProps ) => {
  return (
    <div className="fixed flex h-[100vh] p-5 gap-2 w-screen top-0 left-0 justify-center items-center z-10 bg-[rgba(34,34,34,0.5)]">
      <div className="flex  w-fit shadow-4xl flex-col gap-4 h-fit rounded-lg bg-[#1a1a1a] ">
        <h1 className="text-left text-2xl flex items-center gap-2 md:whitespace-nowrap font-semibold p-5">
          Scan QrCode to Book Appointment for {props.space.ShopName}
          <FiX
            className="float-right text-2xl cursor-pointer"
            onClick={() => props.setIsOpen(false)}
          />
        </h1>
        <div className="w-full h-full flex items-center justify-center p-5 " >
                <div className="bg-[#121212] shadow-4xl rounded-lg w-fit h-fit p-3">
                <QRCode value={props.space.id} />
                </div>
        </div>
      </div>
    </div>
  );
};

export default QrPopup;
