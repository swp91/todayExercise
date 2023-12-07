import { useState, useRef, useEffect } from "react";
import AerobicList from "./AerobicList";
import { useRecoilState } from "recoil";
import { aerobicListState } from "../../recoil/Exercise";
import Timer from "./Timer";
import { toast } from "react-toastify";

export type AerobicItem = {
  exercise: string;
  amount: string;
};

const AerobicExercise = () => {
  const [exercise, setExercise] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [exercisesList, setExercisesList] = useRecoilState(aerobicListState);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const exercisesOptions = ["걷기", "달리기", "자전거"];

  const handleAddExercise = () => {
    if (!exercise && !amount) {
      toast.warn("운동 이름과 운동량를 설정해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!exercise) {
      toast.warn("운동 이름을 선택해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!amount) {
      toast.warn("운동 량을 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      const newExercise: AerobicItem = { exercise, amount };
      setExercisesList([...exercisesList, newExercise]);
      setExercise("");
      setAmount("");
    }
  };

  const selectExercise = (exercise: string) => {
    setExercise(exercise);
    setDropdownOpen(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if ((value === "" || /^\d+$/.test(value)) && value.length <= 4) {
      setAmount(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(amount);

  return (
    <div>
      <div className="flex items-center mt-10 ml-7">
        <div className="relative" ref={dropdownRef}>
          <div
            className="font-bold cursor-pointer border border-itemgray rounded-3xl py-2 px-5 w-28"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {exercise || "운동종류"}
          </div>
          {dropdownOpen && (
            <div className="absolute border border-itemgray mt-1 py-2 bg-white rounded-3xl w-28">
              {exercisesOptions.map((option, index) => (
                <div
                  key={index}
                  className="py-2 px-5 hover:text-maincolor hover:cursor-pointer"
                  onClick={() => selectExercise(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="number"
          className="focus:outline-none hide-number-spinner ml-8 rounded-3xl py-2 px-4 border border-itemgray w-20"
          value={amount}
          onChange={handleAmountChange}
        />
        <span className="ml-1 text-xl">Km</span>

        <div className="ml-6 cursor-pointer">
          <img
            src="/img/addbtn.svg"
            alt="추가버튼"
            onClick={handleAddExercise}
          />
        </div>
      </div>
      <div>
        <AerobicList />
      </div>
      <Timer />
    </div>
  );
};

export default AerobicExercise;
