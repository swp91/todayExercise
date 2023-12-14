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
    const response = await axios.post(
      `${API_BASE_URL}/workout/cardioEx`,
      {
        workTime,
        cardioEx,
      },
      {
        withCredentials: true,
      }
    );
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
    const response = await axios.post(
      `${API_BASE_URL}/workout/strengthEx`,
      {
        workTime,
        strengthEx,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("운동저장 실패", error);
    throw error;
  }
};

//모든 운동 기록 조회
export const exericiseallRecord = async (cursor: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout/all`, {
      params: {
        cursor,
        pageSize: 7,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("기록조회 실패", error);
    throw error;
  }
};
