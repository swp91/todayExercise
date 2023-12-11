import { useRecoilState, useRecoilValue } from "recoil";
import { exerciseTabState, timerState } from "../recoil/Exercise";
import AerobicExercise from "../components/Exercise/AerobicExercise";
import AnaerobicExercise from "../components/Exercise/AnaerobicExercise";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isLoggedInState } from "../recoil/User";
import { useEffect } from "react";

const Exercise = () => {
  const [activeTab, setActiveTab] = useRecoilState(exerciseTabState);
  const [isTimerOn] = useRecoilState(timerState);
  const navigate = useNavigate();
  const LoginCheck = useRecoilValue(isLoggedInState);

  useEffect(() => {
    if (!LoginCheck) {
      navigate("/login");
    }
  }, []);

  const changeTab = (tabName: string) => {
    if (!isTimerOn) {
      setActiveTab(tabName);
    } else {
      toast.error("타이머가 작동 중일 때는 탭을 변경할 수 없습니다.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-around mx-4">
        <div
          className={`flex-1 flex items-center justify-center border-b-4 h-24 ${
            activeTab === "aerobic" ? "border-maincolor" : "border-itemgray"
          }`}
        >
          <span
            className={`text-3xl font-bold  cursor-pointer p-5 ${
              activeTab === "aerobic" ? "text-maincolor" : "text-itemgray"
            }`}
            onClick={() => changeTab("aerobic")}
          >
            유산소
          </span>
        </div>
        <div
          className={`flex-1 flex items-center justify-center border-b-4 h-24 ${
            activeTab === "anaerobic" ? "border-maincolor" : "border-itemgray"
          }`}
        >
          <span
            className={`text-3xl font-bold  cursor-pointer p-5 ${
              activeTab === "anaerobic" ? "text-maincolor" : "text-itemgray"
            }`}
            onClick={() => changeTab("anaerobic")}
          >
            무산소
          </span>
        </div>
      </div>
      <div>
        {activeTab === "aerobic" ? <AerobicExercise /> : <AnaerobicExercise />}
      </div>
    </div>
  );
};

export default Exercise;
