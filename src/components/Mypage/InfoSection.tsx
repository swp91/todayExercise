import { useRecoilState, useSetRecoilState } from "recoil";
import { logOut } from "../../api/UserApi";
import { useEffect, useRef } from "react";
import { isLoggedInState } from "../../recoil/User";
import { useNavigate } from "react-router-dom";
import {
  UserProfile,
  nicknameModal,
  passwordChangepage,
  profileInfo,
} from "../../recoil/Mypages";
import { profileImageChange, myprofileInfo } from "../../api/MypageApi";
// import { toast } from "react-toastify";

const InfoSection = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const setNickModal = useSetRecoilState(nicknameModal);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [myInfo, setMyInfo] = useRecoilState<UserProfile | null>(profileInfo);
  const setPassChangePage = useSetRecoilState(passwordChangepage);

  const profileData = async () => {
    try {
      const response = await myprofileInfo();
      setMyInfo(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(myInfo, "프로필인포");

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
    profileData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logOut();
      console.log(response);
      setLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const modalOpen = () => {
    setNickModal(true);
  };
  const pageOpen = () => {
    setPassChangePage(true);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("imageFile", file);

      try {
        await profileImageChange(formData);
        console.log("성공");
      } catch (error) {
        console.log("실패");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between pt-10 mb-4">
        <div className="flex items-center">
          <div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <img
              className="w-24 h-24 rounded-[50%] cursor-pointer"
              src={
                myInfo && myInfo.profileImage !== "null"
                  ? myInfo.profileImage
                  : "/img/profiledefault.svg"
              }
              alt=""
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            />
          </div>
          <div className="flex gap-3">
            <div className="ml-5 text-2xl font-bold">{myInfo?.nickName}</div>
            <img
              src="/img/modify.svg"
              alt=""
              className="cursor-pointer"
              onClick={modalOpen}
            />
          </div>
        </div>
        <div
          className="px-2 py-1 bg-maincolor text-white text-lg rounded-xl flex items-center justify-center mr-4 cursor-pointer hover:opacity-80"
          onClick={pageOpen}
        >
          비밀번호 변경
        </div>
      </div>
      <div className="flex justify-end ">
        <span
          className="bg-maincolor px-2 py-1 rounded-xl text-white mr-4 cursor-pointer hover:opacity-80"
          onClick={handleLogout}
        >
          로그아웃
        </span>
      </div>
    </div>
  );
};

export default InfoSection;
