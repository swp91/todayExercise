import { atom } from "recoil";

//닉네임수정 모달창 온오프
export const nicknameModal = atom({
  key: "nicknameModal",
  default: false,
});

export interface UserProfile {
  profileImage: string;
  nickName: string;
}

//마이페이지 내 정보
export const profileInfo = atom<UserProfile | null>({
  key: "profileInfo",
  default: null,
});

//비밀번호변경 페이지 진입
export const passwordChangepage = atom({
  key: "passwordChangepage",
  default: false,
});
