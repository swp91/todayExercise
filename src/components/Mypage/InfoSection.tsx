import { useRecoilState, useSetRecoilState } from "recoil";
import { logOut } from "../../api/UserApi";
import { useEffect, useRef } from "react";
import { isLoggedInState } from "../../recoil/User";
import { useNavigate } from "react-router-dom";
import { nicknameModal } from "../../recoil/Mypages";
import { profileImageChange } from "../../api/MypageApi";

const InfoSection = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const setNickModal = useSetRecoilState(nicknameModal);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
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

  const isOpen = () => {
    setNickModal(true);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
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
              src="/img/mysample.jpg"
              alt=""
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            />
          </div>
          <div className="flex gap-3">
            <div className="ml-5 text-2xl font-bold">닉네임</div>
            <img
              src="/img/modify.svg"
              alt=""
              className="cursor-pointer"
              onClick={isOpen}
            />
          </div>
        </div>
        <div className="px-2 py-1 bg-maincolor text-white text-lg rounded-xl flex items-center justify-center mr-4 cursor-pointer">
          비밀번호 변경
        </div>
      </div>
      <div className="flex justify-end ">
        <span
          className="bg-maincolor px-2 py-1 rounded-xl text-white mr-4 cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </span>
      </div>
    </div>
  );
};

export default InfoSection;
