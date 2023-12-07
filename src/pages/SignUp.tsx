import React from "react";
import InputField, { SignUpFormData } from "../components/common/InputField";
import { useForm } from "react-hook-form";
import { signUp, emailCheck } from "../api/User";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const username = watch("username");
  // const nickname = watch("nickname");
  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await signUp(
        data.username,
        data.nickname,
        data.password
      );
      console.log("회원가입 성공:", response);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const checkDuplicate = async () => {
    // 중복 확인 로직
    try {
      const response = await emailCheck(username);
      console.log(response);
    } catch (error) {
      console.error("회원가입 ");
    }
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <h1 className="text-3xl my-16">회원가입</h1>
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
          onCheck={checkDuplicate}
          className="mb-2"
          placeholder="아이디는 이메일 형식 입니다."
        />
        <p className="text-red-500 text-sm ml-2 mb-6 min-h-[20px]">
          {errors.username ? errors.username.message : ""}
        </p>

        <InputField
          label="닉네임"
          name="nickname"
          register={register("nickname", {
            required: "닉네임은 필수 입력 항목입니다.",
            minLength: {
              value: 2,
              message: "닉네임은 2글자 이상이어야 합니다.",
            },
            maxLength: {
              value: 8,
              message: "닉네임은 8글자 이하이어야 합니다.",
            },
            pattern: {
              value: /^[가-힣A-Za-z]+$/,
              message: "한글 또는 영어만 입력 가능합니다.",
            },
          })}
          onCheck={checkDuplicate}
          className="mb-2"
          placeholder="한글 또는 영어로 2글자이상 8글자 이하"
        />
        <p className="text-red-500 text-sm ml-2 mb-6 min-h-[20px]">
          {errors.nickname ? errors.nickname.message : ""}
        </p>

        <InputField
          label="비밀번호"
          name="password"
          register={register("password", {
            required: "비밀번호는 필수 입력 항목입니다.",
            minLength: {
              value: 4,
              message: "비밀번호는 4글자 이상이어야 합니다.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
              message: "영어와 숫자를 혼합하여 입력해주세요.",
            },
          })}
          type="password"
          className="mb-1"
          placeholder="영어와 숫자를 혼합하여 4글자이상"
        />
        <p className="text-red-500 text-sm ml-2 mb-2 min-h-[20px]">
          {errors.password ? errors.password.message : ""}
        </p>

        <InputField
          label="비밀번호 확인"
          name="confirmPassword"
          register={register("confirmPassword", {
            required: "비밀번호 확인은 필수 입력 항목입니다.",
            validate: (value) =>
              value === password || "입력한 비밀번호와 일치하지 않습니다.",
          })}
          type="password"
          className="mb-1"
          placeholder="비밀번호를 한번 더 입력해주세요."
        />
        <p className="text-red-500 text-sm ml-2 min-h-[20px]">
          {errors.confirmPassword ? errors.confirmPassword.message : ""}
        </p>

        <button
          type="submit"
          className="mt-20 text-center w-full h-12 rounded-[20px] bg-maincolor text-white text-xl"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
