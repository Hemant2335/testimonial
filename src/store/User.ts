import { atom } from "recoil";

type User = {
  name: string;
  email: string;
  type: "USER" | "BUSINESS" | "ADMIN";
  id: string;
};

export const userState = atom({
  key: "userState",
  default: {} as User,
});
