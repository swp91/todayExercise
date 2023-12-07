import { useRecoilValue } from "recoil";
import { recordsState } from "../../recoil/ExerciseRecords";
import { formatDateISO } from "./DateUtils";
import TodayRecordbox from "./TodayRecordbox";

const TodayExercise = () => {
  const records = useRecoilValue(recordsState);
  const today = new Date();
  const todayISO = formatDateISO(today);
  const todayRecord =
    records.find((record) => record.date === todayISO) ?? null;

  return (
    <div className="flex mt-10 items-center justify-center gap-12">
      <div className="font-bold text-maincolor text-4xl">TODAY</div>
      <TodayRecordbox
        record={todayRecord}
        type="aerobic"
        imageSrc="/img/aerobic.svg"
        altText="유산소"
        title="유산소"
      />
      <TodayRecordbox
        record={todayRecord}
        type="anaerobic"
        imageSrc="/img/anaerobic.svg"
        altText="무산소"
        title="무산소"
      />
    </div>
  );
};

export default TodayExercise;
