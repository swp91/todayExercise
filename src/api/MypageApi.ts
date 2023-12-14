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
