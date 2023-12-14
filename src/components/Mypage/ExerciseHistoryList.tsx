import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  exerciseAllData,
  exercisedatacursor,
  moreExercisedata,
} from "../../recoil/Exercise";
import { exericiseallRecord } from "../../api/ExerciseApi";
import { ExerciseRecord, ProcessedData } from "./MypageType";

const ExerciseHistoryList = () => {
  const [allData, setAllData] =
    useRecoilState<ExerciseRecord[]>(exerciseAllData);
  const [latestDataPerDate, setLatestDataPerDate] = useState<ProcessedData[]>(
    []
  );
  const [cursor, setCursor] = useRecoilState(exercisedatacursor);
  const [hasMore, setHasMore] = useRecoilState(moreExercisedata);

  const loadData = async () => {
    if (!hasMore) return;

    try {
      const response = await exericiseallRecord(cursor);
      const newData = response.data.data;

      setAllData((prevData) => [...prevData, ...newData]);

      if (newData.length === 0 || !newData[newData.length - 1].remainingData) {
        setHasMore(false);
      } else {
        setCursor(newData[newData.length - 1].workoutId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (allData.length === 0) {
      loadData();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let formattedTime = "";
    if (hrs > 0) formattedTime += `${hrs}시간 `;
    if (mins > 0) formattedTime += `${mins}분 `;
    if (secs > 0 || (hrs === 0 && mins === 0)) formattedTime += `${secs}초`;

    return formattedTime.trim();
  };

  interface GroupedData {
    [date: string]: ExerciseRecord[];
  }

  interface TimeGroup {
    [time: string]: {
      exercises: ExerciseRecord[];
      time: string;
    };
  }

  useEffect(() => {
    const groupedData = allData.reduce((acc, item) => {
      const date = item.createdAt.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {} as GroupedData);

    const sortedDates = Object.keys(groupedData).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    const processedData = sortedDates.map((date) => {
      const dayRecords = groupedData[date];

      const timeGroups = dayRecords.reduce((groupAcc, record) => {
        const timeKey = record.createdAt;
        if (!groupAcc[timeKey]) {
          groupAcc[timeKey] = {
            exercises: [],
            time:
              record.km != null
                ? formatTime(parseInt(record.cardioExTime!))
                : formatTime(parseInt(record.strengthTime!)),
          };
        }
        groupAcc[timeKey].exercises.push(record);
        return groupAcc;
      }, {} as TimeGroup);

      return {
        date,
        timeGroups: Object.values(timeGroups),
      };
    });

    setLatestDataPerDate(processedData);
  }, [allData]);

  return (
    <div className="pb-20">
      <div className="mt-8 border-t-4 pt-10 pb-20">
        {latestDataPerDate.map((data) => (
          <div key={data.date} className="mb-8 z-0">
            <h3 className="font-bold text-xl mb-3 ">{data.date}</h3>
            {data.timeGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="bg-itemgray rounded-xl py-2 px-4 mb-3 flex flex-col relative"
              >
                <div className="font-bold absolute top-[40%] right-2">
                  {group.time}
                </div>
                {group.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex}>
                    {exercise.km != null ? (
                      <div className="flex mb-1">
                        <p>{exercise.caExName}</p>
                        <p className="mx-1">-</p>
                        <p>{exercise.km}km</p>
                      </div>
                    ) : (
                      <div className="flex mb-1">
                        <p>{exercise.stExName}</p>
                        <p className="mx-1">-</p>
                        <p className="mr-4">{exercise.kg}kg</p>
                        <p>{exercise.rep}회</p>
                        <p className="mx-1">*</p>
                        <p>{exercise.set}세트</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      {hasMore && (
        <div
          onClick={loadData}
          className="load-more-button flex items-center justify-center"
        >
          <button className="bg-maincolor cursor-pointer text-white text-lg py-1 px-4 rounded-lg">
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseHistoryList;
