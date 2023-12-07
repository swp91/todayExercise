import { atom } from "recoil";
import { AerobicItem } from "../components/Exercise/AerobicExercise";
import { AnaerobicItem } from "../components/Exercise/AnaerobicExercise";

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
