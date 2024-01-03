import React from "react";
import { ProcessedData } from "./MypageType";

const ListItem: React.FC<{ data: ProcessedData }> = ({ data }) => {
  return (
    <div key={data.date} className="mb-8">
      <h3 className="font-bold text-xl mb-3 mobile:text-lg mobile:mb-1">
        {data.date}
      </h3>
      {data.timeGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="bg-itemgray rounded-xl py-2 px-4 mb-3 flex flex-col relative mobile:text-sm"
        >
          <div className="font-bold absolute top-[40%] right-2">
            {group.time}
          </div>
          {group.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex}>
              {exercise.km != null ? (
                <div className="flex mb-1">
                  <p>{exercise.caExName}</p>
                  <p className="mx-1 mobile:mx-0.5">-</p>
                  <p>{exercise.km}km</p>
                </div>
              ) : (
                <div className="flex mb-1">
                  <p>{exercise.stExName}</p>
                  <p className="mx-1 mobile:mx-0.5">-</p>
                  <p className="mr-4 mobile:mr-2">{exercise.kg}kg</p>
                  <p>{exercise.rep}회</p>
                  <p className="mx-1 mobile:mx-0.5">*</p>
                  <p>{exercise.set}세트</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListItem;
