import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { anaerobicListState } from "../../recoil/Exercise";
import Timer from "./Timer";
import { toast } from "react-toastify";
import AnaerobicList from "./AnaerobicList";

export type AnaerobicItem = {
  exerciseCategory: string;
  specificExercise: string;
  reps: string;
  sets: string;
};

const AerobicExercise = () => {
  const [exerciseCategory, setExerciseCategory] = useState<string>("");
  const [specificExercise, setSpecificExercise] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [sets, setSets] = useState<string>("");
  const [exercisesList, setExercisesList] = useRecoilState(anaerobicListState);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [specificDropdownOpen, setSpecificDropdownOpen] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const specificDropdownRef = useRef<HTMLDivElement>(null);

  const exercisesOptions: { [key: string]: string[] } = {
    가슴: [
      "벤치프레스",
      "인클라인 벤치프레스",
      "딥스",
      "케이블 크로스오버",
      "덤벨 플라이",
      "덤벨 프레스",
    ],
    등: ["데드리프트", "바벨로우", "덤벨로우", "풀업"],
    어깨: [
      "바벨 숄더 프레스",
      "덤벨 숄더 프레스",
      "사이드레터럴 레이즈",
      "업라이트 로우",
    ],
    팔: [
      "바벨 컬",
      "덤벨 컬",
      "해머 컬",
      "케이블 푸쉬 다운",
      "오버헤드 덤벨 익스텐션",
    ],
    하체: ["스쿼트", "레그 프레스", "레그 익스텐션"],
  };

  const categoryOptions = Object.keys(exercisesOptions);

  const handleAddExercise = () => {
    if (!exerciseCategory && !specificExercise) {
      toast.warn("운동 파트와 종류를 설정해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!reps) {
      toast.warn("운동 횟수를 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (!sets) {
      toast.warn("운동 세트를 입력해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      const newExercise: AnaerobicItem = {
        exerciseCategory,
        specificExercise,
        reps,
        sets,
      };
      setExercisesList([...exercisesList, newExercise]);
      setExerciseCategory("");
      setSpecificExercise("");
      setReps("");
      setSets("");
    }
  };

  const selectExerciseCategory = (category: string) => {
    setExerciseCategory(category);
    setSpecificExercise(""); // 운동 종류 초기화
    setDropdownOpen(false);
    setSpecificDropdownOpen(true); // 운동 종류 드롭다운 활성화
  };

  const selectSpecificExercise = (exercise: string) => {
    setSpecificExercise(exercise);
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

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if ((value === "" || /^\d+$/.test(value)) && value.length <= 4) {
      setReps(value);
    }
  };

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if ((value === "" || /^\d+$/.test(value)) && value.length <= 4) {
      setSets(value);
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
            {exerciseCategory || "운동파트"}
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
        {exerciseCategory && (
          <div className="relative ml-4" ref={specificDropdownRef}>
            <div
              className="cursor-pointer border border-itemgray rounded-3xl py-2 px-5 w-50"
              onClick={() => setSpecificDropdownOpen(!specificDropdownOpen)}
            >
              {specificExercise || "운동종류"}
            </div>
            {specificDropdownOpen && (
              <div className="absolute border border-itemgray mt-1 py-2 bg-white rounded-3xl w-50">
                {exercisesOptions[exerciseCategory]?.map((option, index) => (
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
          className="focus:outline-none hide-number-spinner ml-4 rounded-3xl py-2 px-4 border border-itemgray w-20"
          value={reps}
          onChange={handleRepsChange}
        />
        <span className="ml-1 text-xl">회</span>
        <input
          type="number"
          className="focus:outline-none hide-number-spinner ml-4 rounded-3xl py-2 px-4 border border-itemgray w-20"
          value={sets}
          onChange={handleSetsChange}
        />
        <span className="ml-1 text-xl">세트</span>

        <div className="ml-6 cursor-pointer">
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
