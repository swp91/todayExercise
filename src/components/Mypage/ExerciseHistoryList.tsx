import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { exerciseAllData } from "../../recoil/Exercise";
import { exericiseallRecord } from "../../api/ExerciseApi";
import { ExerciseRecord, ProcessedData } from "./ExerciseType";
import InfiniteScroll from "react-infinite-scroll-component";

const ExerciseHistoryList = () => {
  const [allData, setAllData] =
    useRecoilState<ExerciseRecord[]>(exerciseAllData);
  const [latestDataPerDate, setLatestDataPerDate] = useState<ProcessedData[]>(
    []
  );
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  console.log(allData, "올데이타");

  const loadData = async () => {
    if (!hasMore) return; // 더 이상 로드할 데이터가 없으면 함수 종료

    try {
      const response = await exericiseallRecord(cursor); // cursor를 사용하여 데이터 로드
      console.log(response.data, "확인");
      const newData = response.data;

      setAllData((prevData) => [...prevData, ...newData]); // 기존 데이터에 새 데이터 추가

      if (newData.length === 0 || !newData[newData.length - 1].remainingData) {
        setHasMore(false); // 더 이상 로드할 데이터가 없으면 hasMore를 false로 설정
      } else {
        setCursor(newData[newData.length - 1].workoutId); // 다음 로드를 위해 cursor 업데이트
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData(); // 컴포넌트 마운트 시 첫 데이터 로드
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
    <InfiniteScroll
      dataLength={latestDataPerDate.length}
      next={loadData}
      hasMore={hasMore}
      loader={<h4>로딩중</h4>}
    >
      <div className="mt-8 border-t-4 pt-10 pb-20">
        {latestDataPerDate.map((data) => (
          <div key={data.date} className="mb-8">
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
    </InfiniteScroll>
  );
};

export default ExerciseHistoryList;
