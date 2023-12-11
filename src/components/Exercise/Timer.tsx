import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  aerobicListState,
  anaerobicListState,
  exerciseTabState,
  modalState,
  timerState,
} from "../../recoil/Exercise";
import TimerModal from "./TimerModal";
import { toast } from "react-toastify";
import { aerobicRecord, anaerobicRecord } from "../../api/ExerciseApi";

const Timer = () => {
  const [timer, setTimer] = useRecoilState(timerState);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [aerobicList, setAerobicList] = useRecoilState(aerobicListState);
  const [anaerobicList, setAnaerobicList] = useRecoilState(anaerobicListState);
  const activeTab = useRecoilValue(exerciseTabState);

  useEffect(() => {
    let interval: number | undefined;
    if (isTimerOn) {
      interval = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerOn, timer]); // eslint-disable-line react-hooks/exhaustive-deps

  const startTimer = () => {
    const currentList = activeTab === "aerobic" ? aerobicList : anaerobicList;
    if (currentList.length === 0) {
      toast.error("현재 설정한 운동이 없습니다.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }
    setIsTimerOn(true);
  };

  const handleTimerClick = () => {
    // 모달 창을 열고 타이머를 일시 정지
    if (isTimerOn) {
      setIsTimerOn(false);
      setIsModalOpen(true);
    } else {
      // 타이머 시작
      startTimer();
    }
  };

  const handleModalClose = () => {
    // 모달 창을 닫고 타이머를 재개
    setIsModalOpen(false);
    setIsTimerOn(true);
  };

  const handleModalConfirm = async () => {
    let response;

    try {
      if (activeTab === "aerobic") {
        response = await aerobicRecord(timer.toString(), aerobicList);
      } else {
        response = await anaerobicRecord(timer.toString(), anaerobicList);
      }
      console.log(response);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }

    setTimer(0);
    if (activeTab === "aerobic") {
      setAerobicList([]);
    } else {
      setAnaerobicList([]);
    }
    setIsTimerOn(false);
    setIsModalOpen(false);
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
