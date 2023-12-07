import React from "react";
import { formatDateISO, formatDuration } from "./DateUtils";

interface Record {
  date: string;
  aerobic: number;
  anaerobic: number;
}

interface ExerciseRecordProps {
  records: Record[];
  days: Date[];
}

const ExerciseRecord: React.FC<ExerciseRecordProps> = ({ records, days }) => {
  return (
    <>
      {days.map((day) => {
        const record = records.find((r) => r.date === formatDateISO(day));
        return (
          <div key={formatDateISO(day)} className="mt-5">
            <div className="flex items-center justify-center">
              {record && record.aerobic > 0 ? (
                <div className="w-24 h-16 bg-maincolor rounded-xl text-white flex flex-col items-center justify-center">
                  <img src="/img/aerobicwhite.svg" alt="유산소" />
                  <span>{formatDuration(record.aerobic)}</span>
                </div>
              ) : (
                <div className="w-24 h-16"></div> // 유산소 운동 공간 유지
              )}
            </div>
            <div className="flex items-center justify-center mt-2">
              {record && record.anaerobic > 0 ? (
                <div className="w-24 h-16 bg-maincolor rounded-xl text-white flex flex-col items-center justify-center">
                  <img src="/img/anaerobicwhite.svg" alt="무산소" />
                  <span>{formatDuration(record.anaerobic)}</span>
                </div>
              ) : (
                <div className="w-24 h-16"></div> // 무산소 운동 공간 유지
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ExerciseRecord;
