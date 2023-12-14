import React from "react";
import { formatDateISO, formatDuration } from "./DateUtils";
import { groupByDate } from "./DateUtils";
import { RecordType } from "./DateUtils";

interface ExerciseRecordProps {
  records: RecordType[];
  days: Date[];
}

const ExerciseRecord: React.FC<ExerciseRecordProps> = ({ records, days }) => {
  const groupedRecords = groupByDate(records);

  return (
    <>
      {days.map((day) => {
        const dateStr = formatDateISO(day); // YYYY-MM-DD 형식으로 날짜 포맷
        const dayRecord = groupedRecords[dateStr];

        return (
          <div key={dateStr} className="mt-5">
            <div className="flex items-center justify-center">
              {dayRecord && dayRecord.cardio > 0 ? (
                <div className="w-24 h-16 bg-maincolor rounded-xl text-white flex flex-col items-center justify-center">
                  <img src="/img/aerobicwhite.svg" alt="유산소" />
                  <span>{formatDuration(dayRecord.cardio)}</span>
                </div>
              ) : (
                <div className="w-24 h-16"></div>
              )}
            </div>
            <div className="flex items-center justify-center mt-2">
              {dayRecord && dayRecord.strength > 0 ? (
                <div className="w-24 h-16 bg-maincolor rounded-xl text-white flex flex-col items-center justify-center">
                  <img src="/img/anaerobicwhite.svg" alt="무산소" />
                  <span>{formatDuration(dayRecord.strength)}</span>
                </div>
              ) : (
                <div className="w-24 h-16"></div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ExerciseRecord;
