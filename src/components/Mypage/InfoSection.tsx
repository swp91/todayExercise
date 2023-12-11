import { useRecoilState } from "recoil";
import { logOut } from "../../api/UserApi";
import { useEffect } from "react";
import { isLoggedInState } from "../../recoil/User";
import { useNavigate } from "react-router-dom";

const InfoSection = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
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
    } catch (error) {
      console.error(error);
    }
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
          <div className="ml-5 text-3xl font-bold">닉네임</div>
        </div>
        <div className="w-36 h-14 bg-maincolor text-white text-2xl rounded-3xl flex items-center justify-center mr-4 cursor-pointer">
          정보수정
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
