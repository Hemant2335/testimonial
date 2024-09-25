import React, { useContext, useEffect, useRef, useState } from "react";
import { WebSocketContext } from "./WebSocketContext";
import { userState } from "../store/User";
import { useRecoilValue } from "recoil";
import toast from "react-hot-toast";

export const WebSocketProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const user = useRecoilValue(userState);

  useEffect(() => {
    // Initialize the WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      if (user?.name) {
        const msg = {
          event: "createUser",
          data: {
            id: user.id,
            name: user.name,
          },
        };
        socket.send(JSON.stringify(msg));
      }
    };

    socket.onmessage = (message: any) => {
      console.log("WebSocket message received:", message);
      message = JSON.parse(message.data);
      if (message.event === "appointment-status") {
        if (message.data.status === true) {
          if(message.data.isSpaceOwner === true){
            toast(message.data.message, {
              icon: '👏',
            });
          }else{
            toast.success(message.data.message);
          }
          
        }else{
          toast.error(message.data.message);
        }
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error: any) => {
      console.error("WebSocket error: ", error);
    };

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user]);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
