import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <div className="h-36 flex items-center justify-center">
      <Link
        to={"/login"}
        className="h-28 w-4/5 bg-maincolor flex items-center justify-center rounded-2xl cursor-pointer"
      >
        <div className="text-white text-2xl mobile:text-xl">
          로그인해서 나의 운동기록을 확인해보세요!
        </div>
      </Link>
    </div>
  );
};

export default Instructions;
