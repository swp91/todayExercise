import React from "react";
import InputField from "../components/common/InputField";
import { useForm } from "react-hook-form";
import { signIn } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "../recoil/User";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export interface LoginFormdata {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormdata>();

  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const onSubmit = async (data: LoginFormdata) => {
    try {
      const response = await signIn(data.username, data.password);

      if (response.message === "Success") {
        toast.success("로그인 성공: " + response.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        setIsLoggedIn(true);
        navigate("/");
      } else {
        toast.error("로그인 실패: " + response.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("로그인 처리 중 오류 발생: " + error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <h1 className="text-3xl mb-16 mt-40">오늘은 어디?</h1>
      <form className="w-3/5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="아이디"
          name="username"
          type="email"
          register={register("username", {
            required: "아이디는 필수 입력 항목입니다.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
          placeholder="아이디를 입력해주세요."
          className="mb-2"
        />
        <p className="text-red-500 text-sm ml-2 mb-2 min-h-[20px]">
          {errors.username ? errors.username.message : ""}
        </p>

        <InputField
          label="비밀번호"
          name="password"
          register={register("password", {
            required: "비밀번호는 필수 입력 항목입니다.",
          })}
          type="password"
          className="mb-1"
          placeholder="비밀번호를 입력해주세요."
        />

        <p className="text-red-500 text-sm ml-2 min-h-[20px]">
          {errors.password ? errors.password.message : ""}
        </p>

        <button
          type="submit"
          className="mt-20 text-center w-full h-12 rounded-[20px] bg-maincolor text-white text-xl"
        >
          로그인
        </button>
      </form>
      <Link className="mt-7 cursor-pointer" to="/join">
        회원가입
      </Link>
    </div>
  );
};

export default SignIn;
