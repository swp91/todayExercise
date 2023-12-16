import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  aerobicListState,
  anaerobicListState,
  exerciseTabState,
  isTimerOnState,
  modalState,
  timerState,
} from "../../recoil/Exercise";
import TimerModal from "./TimerModal";
import { toast } from "react-toastify";
import { aerobicRecord, anaerobicRecord } from "../../api/ExerciseApi";
import { useLoadData } from "../Mypage/UseMyPageHooks";
import {
  startTimer,
  stopTimer,
  resetTimer,
  timer as globalTimer,
} from "./timerModule";

const Timer = () => {
  const [timer, setTimer] = useRecoilState(timerState);
  const [isTimerOn, setIsTimerOn] = useRecoilState(isTimerOnState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [aerobicList, setAerobicList] = useRecoilState(aerobicListState);
  const [anaerobicList, setAnaerobicList] = useRecoilState(anaerobicListState);
  const activeTab = useRecoilValue(exerciseTabState);
  const loadData = useLoadData();

  useEffect(() => {
    setTimer(globalTimer);
  }, []);

  const handleTimerClick = () => {
    if (isTimerOn) {
      stopTimer(setIsTimerOn);
      setIsModalOpen(true);
    } else {
      const currentList = activeTab === "aerobic" ? aerobicList : anaerobicList;
      if (currentList.length === 0) {
        toast.error("현재 설정한 운동이 없습니다.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        return;
      }
      startTimer(setTimer, setIsTimerOn);
    }
  };

  const handleModalConfirm = async () => {
    stopTimer(setIsTimerOn);
    try {
      let response;
      if (activeTab === "aerobic") {
        response = await aerobicRecord(timer.toString(), aerobicList);
      } else {
        response = await anaerobicRecord(timer.toString(), anaerobicList);
      }
      console.log(response);
      loadData(true);
    } catch (error) {
      console.error("운동 전송 실패", error);
    }
    resetTimer();
    setTimer(0);
    setAerobicList([]);
    setAnaerobicList([]);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    startTimer(setTimer, setIsTimerOn);
  };

  const formatTime = () => {
    const numericTimer = Number(timer);
    const getSeconds = `0${numericTimer % 60}`.slice(-2);
    const minutes = Math.floor(numericTimer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div>
      <div
        className={`m-auto w-72 h-28 text-white flex items-center justify-center rounded-[40px] mt-8 cursor-pointer ${
          isTimerOn || isModalOpen ? "bg-timered" : "bg-maincolor"
        }`}
        onClick={handleTimerClick}
      >
        <p className="text-2xl">
          {isTimerOn || isModalOpen ? formatTime() : "운동시작"}
        </p>
      </div>
      <TimerModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        currentTime={formatTime()}
      />
    </div>
  );
};

export default Timer;
