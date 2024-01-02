import { isLoggedInState } from "../../recoil/User";
import { useRecoilState, useRecoilValue } from "recoil";
import Instructions from "./Instructions";
import ExerciseRecord from "./ExerciseRecord";
import { formatDay, isToday, getStartOfWeek } from "./useHomeHooks";
import { weekrecordsState } from "../../recoil/ExerciseRecords";
import { exericiseWeekRecord } from "../../api/ExerciseApi";
import { useEffect } from "react";

const WeekDays = () => {
  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  const days = [];

  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [records, setRecords] = useRecoilState(weekrecordsState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await exericiseWeekRecord();
        setRecords(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, []);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    days.push(day);
  }

  return (
    <>
      <div className="mx-2 grid grid-cols-7 gap-4 ">
        {isLoggedIn ? (
          <ExerciseRecord records={records} days={days} />
        ) : (
          <div className="col-span-7">
            <Instructions />
          </div>
        )}
      </div>
      <div className="mx-2 grid grid-cols-7 gap-4 mt-4 mobile:mt-1">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-center flex items-center justify-center"
          >
            <div
              className={`${
                isToday(day, new Date())
                  ? "text-white bg-maincolor"
                  : "text-black bg-itemgray"
              } w-12 h-20 flex flex-col justify-center items-center rounded-3xl text-lg mobile:h-16`}
            >
              {formatDay(day).map((part, index) => (
                <span key={index} className="mobile:text-base">
                  {part}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeekDays;
