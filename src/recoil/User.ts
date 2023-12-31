import { atom } from "recoil";

//로그인 상태
export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});
