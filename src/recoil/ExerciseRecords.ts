import { atom } from "recoil";

export const recordsState = atom({
  key: "recordsState",
  default: [
    { date: "2023-11-26", aerobic: 10, anaerobic: 50 },
    { date: "2023-11-27", aerobic: 0, anaerobic: 80 },
    { date: "2023-12-02", aerobic: 10, anaerobic: 0 },
    { date: "2023-12-05", aerobic: 200, anaerobic: 0 },
    { date: "2023-12-04", aerobic: 0, anaerobic: 20 },
    { date: "2023-12-03", aerobic: 20, anaerobic: 80 },
  ],
});
