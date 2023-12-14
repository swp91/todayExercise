import { atom } from "recoil";
import { RecordType } from "../components/Home/DateUtils";

export const weekrecordsState = atom<RecordType[]>({
  key: "weekrecordsState",
  default: [],
});

[
  {
    created_At: "2023-12-13T03:05:15.51972",
    cardioExTime: "2",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-13T03:21:59.762952",
    cardioExTime: "1",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-13T03:21:59.762952",
    cardioExTime: "1",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-13T03:38:15.207848",
    cardioExTime: "2",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-13T03:38:34.265273",
    cardioExTime: null,
    strengthExTime: "3",
  },
  {
    created_At: "2023-12-13T05:14:49.201066",
    cardioExTime: "1",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-14T03:05:30.131495",
    cardioExTime: "2",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-14T03:05:38.435135",
    cardioExTime: null,
    strengthExTime: "2",
  },
  {
    created_At: "2023-12-14T08:06:44.120191",
    cardioExTime: "1",
    strengthExTime: null,
  },
  {
    created_At: "2023-12-14T08:06:54.798475",
    cardioExTime: "6",
    strengthExTime: null,
  },
];
