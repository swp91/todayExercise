import { useRecoilState, useSetRecoilState } from "recoil";
import { logOut } from "../../api/UserApi";
import { useEffect } from "react";
import { isLoggedInState } from "../../recoil/User";
import { useNavigate } from "react-router-dom";
import {
  UserProfile,
  nicknameModal,
  passwordChangepage,
  profileInfo,
} from "../../recoil/Mypages";
import { myprofileInfo } from "../../api/MypageApi";
import ProfilePicture from "./ProfilePicture";

const InfoSection = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const setNickModal = useSetRecoilState(nicknameModal);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      if (myInfo === null) {
        profileData();
      }
    }
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

  return (
    <div>
      <div className="flex items-center justify-between pt-10 mb-4 mobile:pt-4 mobile:mb-2">
        <div className="flex items-center">
          <ProfilePicture myInfo={myInfo} setMyInfo={setMyInfo} />
          <div className="flex gap-3 mobile:gap-1 items-center">
            <div className="ml-5 text-2xl font-bold mobile:ml-3 mobile:text-lg">
              {myInfo?.nickName}
            </div>
            <img
              src="/img/modify.svg"
              alt=""
              className="cursor-pointer mobile:w-5 mobile:h-5"
              onClick={modalOpen}
            />
          </div>
        </div>
        <div
          className="px-2 py-1 bg-maincolor text-white text-lg rounded-xl flex items-center justify-center mr-4 cursor-pointer hover:opacity-80 mobile:px-1 mobile:text-base"
          onClick={pageOpen}
        >
          비밀번호 변경
        </div>
      </div>
      <div className="flex justify-end">
        <span
          className="bg-maincolor px-2 py-1 rounded-xl text-white mr-4 cursor-pointer hover:opacity-80 mobile:text-sm mobile:px-1.5"
          onClick={handleLogout}
        >
          로그아웃
        </span>
      </div>
    </div>
  );
};

export default InfoSection;
