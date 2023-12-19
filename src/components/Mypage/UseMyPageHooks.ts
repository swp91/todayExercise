import { useRecoilState, useSetRecoilState } from "recoil";
import {
  exerciseAllData,
  exercisedatacursor,
  moreExercisedata,
} from "../../recoil/Exercise";
import { exericiseallRecord } from "../../api/ExerciseApi";
import { useState } from "react";
import imageCompression from "browser-image-compression";

//운동기록 불러오기
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

//이미지 압축하는 함수
export const useImageCompression = (initialImage?: string) => {
  const [image, setImage] = useState(initialImage);
  const [File, setFile] = useState<File | null>(null);

  const compressImage = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options); // 이미지 압축

      setFile(compressedFile); // 압축된 파일 상태 업데이트

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);

      return compressedFile; // 압축된 파일 반환
    } catch (error) {
      console.error("이미지 압축 에러", error);
      return null; // 에러 시 null 반환
    }
  };
  return { image, setImage, compressImage, File, setFile };
};
