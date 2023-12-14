import { atom } from "recoil";
import { AerobicItem } from "../components/Exercise/AerobicExercise";
import { AnaerobicItem } from "../components/Exercise/AnaerobicExercise";
import { ExerciseRecord } from "../components/Mypage/ExerciseType";

//유산소, 무산소 탭전환
export const exerciseTabState = atom({
  key: "exerciseTabState",
  default: "aerobic",
});

//유산소 운동 리스트
export const aerobicListState = atom<AerobicItem[]>({
  key: "aerobicListState",
  default: [],
});

//무산소 운동 리스트
export const anaerobicListState = atom<AnaerobicItem[]>({
  key: "anaerobicListState",
  default: [],
});

//운동 타이머
export const timerState = atom({
  key: "timerState",
  default: 0,
});

//운동시간 확인 모달
export const modalState = atom({
  key: "modalState",
  default: false,
});

//운동기록 전체조회 데이터
export const exerciseAllData = atom<ExerciseRecord[]>({
  key: "exerciseAllData",
  default: [],
});

// [
//   {
//     caExName: "달리기",
//     cardioExTime: "1",
//     createdAt: "2023-12-13T05:14:49.201066",
//     kg: null,
//     km: 12,
//     part: null,
//     remainingData: true,
//     rep: null,
//     set: null,
//     stExName: null,
//     strengthTime: null,
//     workoutId: 108,
//   },
//   {
//     caExName: null,
//     cardioExTime: null,
//     createdAt: "2023-12-13T03:38:34.265273",
//     kg: 12,
//     km: null,
//     part: "어깨",
//     remainingData: true,
//     rep: 11,
//     set: 11,
//     stExName: "바벨 숄더 프레스",
//     strengthTime: "3",
//     workoutId: 107,
//   },
//   {
//     caExName: null,
//     cardioExTime: null,
//     createdAt: "2023-12-13T03:38:34.265273",
//     kg: 11,
//     km: null,
//     part: "하체",
//     remainingData: true,
//     rep: 11,
//     set: 111,
//     stExName: "레그 프레스",
//     strengthTime: "3",
//     workoutId: 107,
//   },
//   {
//     caExName: null,
//     cardioExTime: null,
//     createdAt: "2023-12-13T03:38:34.265273",
//     kg: 15,
//     km: null,
//     part: "등",
//     remainingData: true,
//     rep: 152,
//     set: 54,
//     stExName: "데드리프트",
//     strengthTime: "3",
//     workoutId: 108,
//   },
//   {
//     caExName: "걷기",
//     cardioExTime: "2",
//     createdAt: "2023-12-11T03:38:15.207848",
//     kg: null,
//     km: 12,
//     part: null,
//     remainingData: true,
//     rep: null,
//     set: null,
//     stExName: null,
//     strengthTime: null,
//     workoutId: 106,
//   },
//   {
//     caExName: "달리기",
//     cardioExTime: "1012",
//     createdAt: "2023-12-10T03:21:59.762952",
//     kg: null,
//     km: 12,
//     part: null,
//     remainingData: true,
//     rep: null,
//     set: null,
//     stExName: null,
//     strengthTime: null,
//     workoutId: 108,
//   },
//   {
//     caExName: "자전거",
//     cardioExTime: "3512",
//     createdAt: "2023-12-17T03:05:15.51972",
//     kg: null,
//     km: 35,
//     part: null,
//     remainingData: true,
//     rep: null,
//     set: null,
//     stExName: null,
//     strengthTime: null,
//     workoutId: 103,
//   },
//   {
//     caExName: "걷기",
//     cardioExTime: "3512",
//     createdAt: "2023-12-17T03:05:15.51972",
//     kg: null,
//     km: 35,
//     part: null,
//     remainingData: true,
//     rep: null,
//     set: null,
//     stExName: null,
//     strengthTime: null,
//     workoutId: 103,
//   },
// ],
