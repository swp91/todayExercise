import React from "react";
import { formatTodayDuration } from "./DateUtils";

interface TodayRecordboxProps {
  record: { cardio: number; strength: number };
  type: "cardio" | "strength";
  imageSrc: string;
  altText: string;
  title: string;
}

const TodayRecordbox: React.FC<TodayRecordboxProps> = ({
  record,
  type,
  imageSrc,
  altText,
  title,
}) => {
  const duration = type === "cardio" ? record.cardio : record.strength;

  return (
    <div className="w-40 h-28 border-maincolor border rounded-3xl">
      <div className="flex items-center ml-4 mt-2">
        <img className="w-6 h-6" src={imageSrc} alt={altText} />
        <span className="text-2xl font-bold text-maincolor ml-1">{title}</span>
      </div>
      <div className="text-xl text-center mt-5">
        {formatTodayDuration(duration)}
      </div>
    </div>
  );
};

export default TodayRecordbox;
