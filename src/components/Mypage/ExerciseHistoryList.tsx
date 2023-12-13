import { useEffect } from "react";
import { exericiseallRecord } from "../../api/ExerciseApi";

const ExerciseHistoryList = () => {
  const Alldataload = async () => {
    try {
      const response = await exericiseallRecord();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Alldataload();
  }, []);
  return (
    <div className="mt-8 border-t-4 pt-10">
      <div>23.11.28</div>
      <div></div>
    </div>
  );
};

export default ExerciseHistoryList;
