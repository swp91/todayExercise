import axios from "axios";
import { AerobicItem } from "../components/Exercise/AerobicExercise";
import { AnaerobicItem } from "../components/Exercise/AnaerobicExercise";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//유산소 운동 저장
export const aerobicRecord = async (
  workTime: string,
  cardioEx: AerobicItem[]
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workout/cardioEx`, {
      workTime,
      cardioEx,
    });
    return response;
  } catch (error) {
    console.error("운동저장 실패", error);
    throw error;
  }
};

//무산소 운동 저장
export const anaerobicRecord = async (
  workTime: string,
  strengthEx: AnaerobicItem[]
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workout`, {
      workTime,
      strengthEx,
    });
    return response;
  } catch (error) {
    console.error("운동저장 실패", error);
    throw error;
  }
};
