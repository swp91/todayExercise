import { useRecoilState } from "recoil";
import { aerobicListState } from "../../recoil/Exercise";

const AerobicList = () => {
  const [exercisesList, setExercisesList] = useRecoilState(aerobicListState);

  const handleDeleteExercise = (index: number) => {
    setExercisesList(exercisesList.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div className="mx-8 mt-6 h-[450px] overflow-y-scroll hide-scrollbar">
        {exercisesList.map((item, index) => (
          <div key={index} className="flex items-center mt-2 mb-3">
            <div className="flex">
              <div className="bg-maincolor rounded-tl-3xl rounded-bl-3xl">
                <p className="py-1 px-10 mr-2 text-lg text-white">
                  {item.exName}
                </p>
              </div>
              <div className="border border-maincolor rounded-br-3xl rounded-tr-3xl">
                <p className="py-1 px-10 mr-2 text-lg text-maincolor">
                  {item.km}km
                </p>
              </div>
            </div>

            <div className="w-7 h-7 ml-6 cursor-pointer">
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
