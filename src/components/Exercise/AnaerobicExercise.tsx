import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { anaerobicListState } from "../../recoil/Exercise";
import Timer from "./Timer";
import { toast } from "react-toastify";
import AnaerobicList from "./AnaerobicList";
import { anaerobicOptions } from "./ExerciseOptions";

export type AnaerobicItem = {
  part: string;
  exName: string;
  rep: string;
  set: string;
  kg: string;
};

const AerobicExercise = () => {
  const [part, setPart] = useState<string>("");
  const [exName, setExName] = useState<string>("");
  const [rep, setRep] = useState<string>("");
  const [kg, setKg] = useState<string>("");
  const [set, setSet] = useState<string>("");
  const [exercisesList, setExercisesList] = useRecoilState(anaerobicListState);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [specificDropdownOpen, setSpecificDropdownOpen] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const specificDropdownRef = useRef<HTMLDivElement>(null);

  const categoryOptions = Object.keys(anaerobicOptions);

  const handleAddExercise = () => {
    if (!part && !exName) {
      toast.warn("운동 파트와 종류를 설정해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!rep) {
      toast.warn("운동 횟수를 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!set) {
      toast.warn("운동 세트를 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!kg) {
      toast.warn("중량을 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      const newExercise: AnaerobicItem = {
        part,
        exName,
        rep,
        set,
        kg,
      };
      setExercisesList([...exercisesList, newExercise]);
      setPart("");
      setExName("");
      setKg("");
      setRep("");
      setSet("");
    }
  };

  const selectExerciseCategory = (category: string) => {
    setPart(category);
    setExName(""); // 운동 종류 초기화
    setDropdownOpen(false);
    setSpecificDropdownOpen(true); // 운동 종류 드롭다운 활성화
  };

  const selectSpecificExercise = (exercise: string) => {
    setExName(exercise);
    setSpecificDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        specificDropdownRef.current &&
        !specificDropdownRef.current.contains(event.target as Node)
      ) {
        setSpecificDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if ((value === "" || /^\d+$/.test(value)) && value.length <= 3) {
        setter(value);
      }
    };

  return (
    <div>
      <div className="flex items-center mt-10 ml-7">
        <div className="relative" ref={dropdownRef}>
          <div
            className="font-bold cursor-pointer border border-itemgray rounded-3xl py-2 px-5 w-28"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {part || "운동파트"}
          </div>
          {dropdownOpen && (
            <div className="absolute border border-itemgray mt-1 py-2 bg-white rounded-3xl w-28">
              {categoryOptions.map((option, index) => (
                <div
                  key={index}
                  className="py-2 px-5 hover:text-maincolor hover:cursor-pointer"
                  onClick={() => selectExerciseCategory(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {part && (
          <div className="relative ml-4" ref={specificDropdownRef}>
            <div
              className="cursor-pointer border border-itemgray rounded-3xl py-2 px-5 w-50"
              onClick={() => setSpecificDropdownOpen(!specificDropdownOpen)}
            >
              {exName || "운동종류"}
            </div>
            {specificDropdownOpen && (
              <div className="absolute border border-itemgray mt-1 py-2 bg-white rounded-3xl w-50">
                {anaerobicOptions[part]?.map((option, index) => (
                  <div
                    key={index}
                    className="py-2 px-5 hover:text-maincolor hover:cursor-pointer"
                    onClick={() => selectSpecificExercise(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <input
          type="number"
          className="focus:outline-none hide-number-spinner ml-4 rounded-3xl py-2 px-4 border border-itemgray w-16"
          value={kg}
          onChange={handleChange(setKg)}
        />
        <span className="ml-1 text-xl">kg</span>
        <input
          type="number"
          className="focus:outline-none hide-number-spinner ml-4 rounded-3xl py-2 px-4 border border-itemgray w-16"
          value={rep}
          onChange={handleChange(setRep)}
        />
        <span className="ml-1 text-xl">회</span>
        <input
          type="number"
          className="focus:outline-none hide-number-spinner ml-4 rounded-3xl py-2 px-4 border border-itemgray w-16"
          value={set}
          onChange={handleChange(setSet)}
        />
        <span className="ml-1 text-xl">세트</span>

        <div className="ml-2 cursor-pointer">
          <img
            src="/img/addbtn.svg"
            alt="추가버튼"
            onClick={handleAddExercise}
          />
        </div>
      </div>
      <div>
        <AnaerobicList />
      </div>
      <Timer />
    </div>
  );
};

export default AerobicExercise;
