import { useState, useRef, useEffect } from "react";
import AerobicList from "./AerobicList";
import { useRecoilState } from "recoil";
import { aerobicListState } from "../../recoil/Exercise";
import Timer from "./Timer";
import { toast } from "react-toastify";
import { aerobicOptions } from "./ExerciseOptions";

export type AerobicItem = {
  exName: string;
  km: string;
};

const AerobicExercise = () => {
  const [exName, setExName] = useState<string>("");
  const [km, setKm] = useState<string>("");
  const [exercisesList, setExercisesList] = useRecoilState(aerobicListState);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAddExercise = () => {
    if (!exName && !km) {
      toast.warn("운동 이름과 운동량를 설정해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!exName) {
      toast.warn("운동 이름을 선택해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!km) {
      toast.warn("운동 량을 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      const newExercise: AerobicItem = { exName, km };
      setExercisesList([...exercisesList, newExercise]);
      setExName("");
      setKm("");
    }
  };

  const selectExercise = (exercise: string) => {
    setExName(exercise);
    setDropdownOpen(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if ((value === "" || /^\d+$/.test(value)) && value.length <= 4) {
      setKm(value);
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

  return (
    <div>
      <div className="flex items-center mt-10 ml-7 mobile:mt-3 mobile:ml-2">
        <div className="relative" ref={dropdownRef}>
          <div
            className="font-bold cursor-pointer border border-itemgray rounded-3xl py-2 px-5 w-28 mobile:w-24 mobile:text-sm mobile:px-3"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {exName || "운동종류"}
          </div>
          {dropdownOpen && (
            <div className="absolute border border-itemgray mt-1 py-2 bg-white rounded-3xl w-28 mobile:w-24 mobile:text-sm">
              {aerobicOptions.map((option, index) => (
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
          className="focus:outline-none hide-number-spinner ml-8 rounded-3xl py-2 px-4 border border-itemgray w-20 mobile:ml-2 mobile:py-1.5"
          value={km}
          onChange={handleAmountChange}
        />
        <span className="ml-1 text-xl mobile:text-lg">Km</span>

        <div className="ml-6 cursor-pointer mobile:ml-4 mobile:w-7 mobile:h-7">
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
