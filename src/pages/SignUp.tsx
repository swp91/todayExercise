import React, { useEffect, useState } from "react";
import InputField, { InputFormData } from "../components/common/InputField";
import { useForm } from "react-hook-form";
import { signUp, emailCheck, nickNameCheck } from "../api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputFormData>();
  const navigate = useNavigate();

  const username = watch("username");
  const nickname = watch("nickname");
  const password = watch("password");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  useEffect(() => {
    setIsEmailChecked(false);
  }, [username]);

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [nickname]);

  const onSubmit = async (data: InputFormData) => {
    if (!isEmailChecked || !isNicknameChecked) {
      toast.error("이메일과 닉네임 중복 검사를 완료해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    try {
      await signUp(data.username, data.nickname, data.password);
      toast.success("회원가입에 성공하였습니다.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/login");
    } catch (error) {
      toast.error("회원가입에 실패하였습니다.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const checkemailDuplicate = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const trimmedName = username ? username.trim() : "";

    if (emailRegex.test(trimmedName)) {
      try {
        const response = await emailCheck(username);
        if (response.data.status === 200) {
          toast.success("사용가능한 이메일입니다.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setIsEmailChecked(true);
        } else {
          toast.error("이미 존재하는 이메일입니다.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("이메일 중복 에러");
      }
    } else {
      toast.error("유효한 이메일이 아닙니다.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  const checknickDuplicate = async () => {
    const nicknameRegex = /^[가-힣A-Za-z][가-힣A-Za-z]+$/;
    const trimmedNickname = nickname ? nickname.trim() : "";

    if (nicknameRegex.test(trimmedNickname)) {
      try {
        const response = await nickNameCheck(nickname);
        if (response.data.status === 200) {
          toast.success("사용가능한 닉네임입니다.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setIsNicknameChecked(true);
        } else {
          toast.error("이미 존재하는 닉네임입니다.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("닉네임 중복 에러");
      }
    } else {
      toast.error("유효한 닉네임이 아닙니다.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="m-auto flex flex-col items-center">
      <h1 className="text-3xl my-16 mobile:my-3 mobile:text-2xl mobile:mt-5">
        회원가입
      </h1>
      <form className="w-3/5 mobile:w-4/5" onSubmit={handleSubmit(onSubmit)}>
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
          onCheck={checkemailDuplicate}
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
          onCheck={checknickDuplicate}
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
          className="mt-20 text-center w-full h-12 rounded-[20px] bg-maincolor text-white text-xl mobile:mt-10"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
