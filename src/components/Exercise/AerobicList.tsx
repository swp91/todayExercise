import { useRecoilState } from "recoil";
import { aerobicListState } from "../../recoil/Exercise";

const AerobicList = () => {
  const [exercisesList, setExercisesList] = useRecoilState(aerobicListState);

  const handleDeleteExercise = (index: number) => {
    setExercisesList(exercisesList.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div className="mx-8 mt-6 h-[450px] overflow-y-scroll hide-scrollbar mobile:h-72 mobile:mx-4 mobile:mt-3">
        {exercisesList.map((item, index) => (
          <div key={index} className="flex items-center mt-2 mb-3">
            <div className="flex">
              <div className="bg-maincolor rounded-tl-3xl rounded-bl-3xl flex items-center justify-center">
                <p className="py-1 px-10 mr-2 text-lg text-white mobile:text-sm mobile:pl-3 mobile:px-0">
                  {item.exName}
                </p>
              </div>
              <div className="border border-maincolor rounded-br-3xl rounded-tr-3xl">
                <p className="py-1 px-10 text-lg text-maincolor mobile:text-sm mobile:px-2">
                  {item.km}km
                </p>
              </div>
            </div>

            <div className="w-7 h-7 ml-6 cursor-pointer mobile:ml-3">
              <img
                src="/img/removebtn.svg"
                alt="삭제버튼"
                onClick={() => handleDeleteExercise(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="border-b-2 m-auto mx-8 mt-5"></div>
    </>
  );
};

export default AerobicList;
