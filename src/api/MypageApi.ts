import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//닉네임 변경
export const nickNameChange = async (nickName: string) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/update/nickName?nickName=${nickName}`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("닉네임변경 에러:", error);
    throw error;
  }
};

//사진 변경
export const profileImageChange = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/update/profileImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("프로필 이미지 변경 에러:", error);
    throw error;
  }
};

//내정보 조회
export const myprofileInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/info`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("닉네임변경 에러:", error);
    throw error;
  }
};

//비밀번호 변경
export const passwordChange = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/update/password?oldPassword=${currentPassword}&newPassword=${newPassword}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("비밀번호 변경 에러:", error);
    throw error;
  }
};
