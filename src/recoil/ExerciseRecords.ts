import { atom } from "recoil";
import { RecordType } from "../components/Home/useHomeHooks";

//주간 기록
export const weekrecordsState = atom<RecordType[]>({
  key: "weekrecordsState",
  default: [],
});
