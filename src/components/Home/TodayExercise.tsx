import { useRecoilValue } from "recoil";
import { weekrecordsState } from "../../recoil/ExerciseRecords";
import { formatDateISO } from "./useHomeHooks";
import TodayRecordbox from "./TodayRecordbox";

const TodayExercise = () => {
  const records = useRecoilValue(weekrecordsState);
  const todayISO = formatDateISO(new Date());

  // 오늘 날짜에 해당하는 기록 찾기 및 합산
  const todayRecord = records.reduce(
    (acc, record) => {
      if (record.created_At.startsWith(todayISO)) {
        acc.cardio += record.cardioExTime ? parseInt(record.cardioExTime) : 0;
        acc.strength += record.strengthExTime
          ? parseInt(record.strengthExTime)
          : 0;
      }
      return acc;
    },
    { cardio: 0, strength: 0 }
  );

  return (
    <div className="flex mt-10 items-center justify-center gap-12 mobile:mt-4 mobile:gap-4">
      <div className="font-bold text-maincolor text-4xl mobile:text-3xl">
        TODAY
      </div>
      <TodayRecordbox
        record={todayRecord}
        type="cardio"
        imageSrc="/img/aerobic.svg"
        altText="유산소"
        title="유산소"
      />
      <TodayRecordbox
        record={todayRecord}
        type="strength"
        imageSrc="/img/anaerobic.svg"
        altText="무산소"
        title="무산소"
      />
    </div>
  );
};

export default TodayExercise;
