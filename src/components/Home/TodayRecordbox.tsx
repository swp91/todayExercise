import React from "react";
import { formatTodayDuration } from "./DateUtils";

interface ExerciseRecordProps {
  record: ExerciseRecord | null;
  type: "aerobic" | "anaerobic";
  imageSrc: string;
  altText: string;
  title: string;
}

interface ExerciseRecord {
  date: string;
  aerobic: number | null;
  anaerobic: number | null;
}

const TodayRecordbox: React.FC<ExerciseRecordProps> = ({
  record,
  type,
  imageSrc,
  altText,
  title,
}) => {
  return (
    <div className="w-40 h-28 border-maincolor border rounded-3xl">
      <div className="flex items-center ml-4 mt-2">
        <img className="w-6 h-6" src={imageSrc} alt={altText} />
        <span className="text-2xl font-bold text-maincolor ml-1">{title}</span>
      </div>
      <div className="text-xl text-center mt-5">
        {record && record[type] !== null && record[type] !== undefined
          ? formatTodayDuration(record[type] as number)
          : "0"}
      </div>
    </div>
  );
};

export default TodayRecordbox;
