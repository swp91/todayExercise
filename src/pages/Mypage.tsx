import React from "react";

const Mypage = () => {
  return (
    <div className="mx-10">
      <div className="flex items-center justify-between pt-10 border-b-4 pb-10">
        <div className="flex items-center">
          <div>
            <img
              className="w-24 h-24 rounded-[50%]"
              src="/img/mysample.jpg"
              alt=""
            />
          </div>
          <div className="ml-5 text-3xl font-bold">닉네임</div>
        </div>
        <div className="w-36 h-14 bg-maincolor text-white text-2xl rounded-3xl flex items-center justify-center mr-4 cursor-pointer">
          정보수정
        </div>
      </div>
    </div>
  );
};

export default Mypage;
