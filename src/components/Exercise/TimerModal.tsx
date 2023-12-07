import React from "react";

type TimerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentTime: string;
};

const TimerModal: React.FC<TimerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentTime,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-72 h-72 ">
        <div className="flex flex-col items-center justify-center mt-6 font-bold mb-14">
          <p className="text-maincolor text-xl mb-8">운동을 끝낼까요?</p>
          <p className="text-maincolor text-lg">현재 운동 시간</p>
          <p className="text-timered text-xl">{currentTime}</p>
        </div>
        <div className="flex justify-around mt-4 font-bold">
          <button
            className="border-maincolor border px-5 py-1 rounded-3xl text-lg text-maincolor "
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-blue-500 text-white px-5 py-1 rounded-3xl text-lg "
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
