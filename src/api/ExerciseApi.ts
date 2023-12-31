import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//유산소, 무산소 운동 저장
export const postRecord = async <T>(url: string, data: T) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data, {
      withCredentials: true,
    });
    return response.data;
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

//일주일 운동 기록 조회
export const exericiseWeekRecord = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("기록조회 실패", error);
    throw error;
  }
};
