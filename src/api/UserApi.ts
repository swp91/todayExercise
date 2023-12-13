import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//회원가입
export const signUp = async (
  email: string,
  nickName: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, {
      email,
      nickName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
};

//아이디 중복체크
export const emailCheck = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/check/email/${email}`
    );
    return response;
  } catch (error) {
    console.error("아이디중복체크 에러:", error);
    throw error;
  }
};

//로그인
export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

// 로그아웃
export const logOut = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("로그아웃 에러", error);
    throw error;
  }
};

//홈페이지 접속확인
export const Check = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout/check`);
    return response;
  } catch (error) {
    console.error("체크 에러", error);
    throw error;
  }
};
