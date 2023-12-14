import { useRecoilState, useSetRecoilState } from "recoil";
import { logOut } from "../../api/UserApi";
import { useEffect } from "react";
import { isLoggedInState } from "../../recoil/User";
import { useNavigate } from "react-router-dom";
import { nicknameModal } from "../../recoil/Mypages";

const InfoSection = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
  const setNickModal = useSetRecoilState(nicknameModal);
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="flex items-center justify-between pt-10 mb-4">
        <div className="flex items-center">
          <div>
            <img
              className="w-24 h-24 rounded-[50%]"
              src="/img/mysample.jpg"
              alt=""
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
