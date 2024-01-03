import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { exerciseAllData, moreExercisedata } from "../../recoil/Exercise";
import { ExerciseRecord, ProcessedData } from "./MypageType";
import { useLoadData } from "./UseMyPageHooks";
import { isLoggedInState } from "../../recoil/User";
import ListItem from "./ListItem";

const ExerciseHistoryList = () => {
  const allData = useRecoilValue<ExerciseRecord[]>(exerciseAllData);
  const [latestDataPerDate, setLatestDataPerDate] = useState<ProcessedData[]>(
    []
  );
  const hasMore = useRecoilValue(moreExercisedata);
  const loadData = useLoadData();
  const loginCheck = useRecoilValue(isLoggedInState);

  useEffect(() => {
    if (allData.length === 0 && loginCheck) {
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
      <div className="mt-8 border-t-4 pt-10 pb-20 mobile:mt-4 mobile:border-t-3 mobile: pt-2">
        {latestDataPerDate.map((data) => (
          <ListItem data={data} key={data.date} />
        ))}
      </div>
      {hasMore && (
        <div
          onClick={() => loadData()}
          className="load-more-button flex items-center justify-center"
        >
          <button className="bg-maincolor cursor-pointer text-white text-lg py-1 px-4 rounded-lg mobile:text-base">
            더 보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseHistoryList;
