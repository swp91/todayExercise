import React from "react";
import { formatTodayDuration } from "./useHomeHooks";

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
    <div className="w-40 h-28 border-maincolor border rounded-3xl mobile:w-24 mobile:h-20">
      <div className="flex items-center ml-4 mt-2 mobile:ml-1 mobile:mt-1">
        <img
          className="w-6 h-6 mobile:w-5 mobile:h-5"
          src={imageSrc}
          alt={altText}
        />
        <span className="text-2xl font-bold text-maincolor ml-1 mobile:text-lg">
          {title}
        </span>
      </div>
      <div className="text-xl text-center mt-5 mobile:mt-0 mobile:text-lg">
        {formatTodayDuration(duration)}
      </div>
    </div>
  );
};

export default TodayRecordbox;
