import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="w-full h-14 fixed bottom-0 border-t border-gray-200 bg-white">
      <div className="max-w-3xl m-auto h-14 flex">
        <Link to="/" className="flex-1 flex justify-center items-center">
          <img src="/img/home.svg" alt="" className="cursor-pointer" />
        </Link>
        <Link to="/ex" className="flex-1 flex justify-center items-center">
          <img src="/img/gym.svg" alt="" className="cursor-pointer" />
        </Link>
        <Link to="/my" className="flex-1 flex justify-center items-center">
          <img src="/img/mypage.svg" alt="" className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
