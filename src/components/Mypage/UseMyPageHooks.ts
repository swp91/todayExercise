import { useRecoilState, useSetRecoilState } from "recoil";
import {
  exerciseAllData,
  exercisedatacursor,
  moreExercisedata,
} from "../../recoil/Exercise";
import { exericiseallRecord } from "../../api/ExerciseApi";

export const useLoadData = () => {
  const setAllData = useSetRecoilState(exerciseAllData);
  const [cursor, setCursor] = useRecoilState(exercisedatacursor);
  const [hasMore, setHasMore] = useRecoilState(moreExercisedata);

  const loadData = async (reset = false) => {
    if (!hasMore && !reset) return;

    try {
      const response = await exericiseallRecord(reset ? 0 : cursor);
      const newData = response.data.data;

      setAllData((prevData) => (reset ? newData : [...prevData, ...newData]));

      const moreDataAvailable =
        newData.length > 0 && newData[newData.length - 1].remainingData;

      setHasMore(moreDataAvailable);

      if (moreDataAvailable) {
        setCursor(newData[newData.length - 1].workoutId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loadData;
};
