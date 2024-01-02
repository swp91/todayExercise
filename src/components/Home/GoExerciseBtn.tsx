import { Link } from "react-router-dom";

const GoExerciseBtn = () => {
  return (
    <div className="flex justify-center mt-12">
      <Link
        to={"/ex"}
        className="w-72 h-72 bg-maincolor rounded-[50%] flex items-center justify-center cursor-pointer mobile:w-52 mobile:h-52"
      >
        <span className="text-white font-bold text-4xl mobile:text-2xl">
          오늘은 어디?
        </span>
      </Link>
    </div>
  );
};

export default GoExerciseBtn;
