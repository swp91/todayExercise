import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { nicknameModal } from "../../recoil/Mypages";
import InputField from "../common/InputField";
import { nickNameCheck } from "../../api/UserApi";
import { toast } from "react-toastify";
import { nickNameChange } from "../../api/MypageApi";

const UpdateNicknameModal = () => {
  const [Modal, setModal] = useRecoilState(nicknameModal);
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [lastCheckedNickname, setLastCheckedNickname] = useState("");

  useEffect(() => {
    // 모달 상태에 따른 스크롤 제어
    document.body.style.overflow = Modal ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [Modal]);

  const checkDuplicate = async () => {
    if (!isValid) {
      toast.error("닉네임의 유효성을 확인해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    try {
      const nickname = watch("nickname");
      const result = await nickNameCheck(nickname); // 중복 확인 API 호출
      console.log(result);
      if (result.data.message === "Success") {
        setIsNicknameAvailable(true);
        toast.success("사용할수 있는 닉네임입니다.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        setIsNicknameChecked(true);
        setLastCheckedNickname(watch("nickname"));
      } else {
        setIsNicknameAvailable(false);
      }
    } catch (error) {
      console.error("중복 확인 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "nickname" && value.nickname !== lastCheckedNickname) {
        setIsNicknameChecked(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, lastCheckedNickname]);

  const nickChange = async () => {
    if (isNicknameChecked) {
      try {
        const nickname = watch("nickname");
        const response = await nickNameChange(nickname);
        console.log(response);
        toast.success("수정이 완료되었습니다.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        setModal(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("중복체크를 해주세요.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={closeModal}
    >
      <div
        className="relative top-40 mx-auto p-10 border w-96 shadow-lg rounded-lg bg-white z-50"
        onClick={stopPropagation}
      >
        <form>
          <InputField
            label="새로운 닉네임"
            name="nickname"
            register={register("nickname", {
              required: "닉네임을 입력해주세요.",
              pattern: {
                value: /^[가-힣a-zA-Z]{2,8}$/,
                message: "닉네임은 한글 또는 영어로 2~8글자이어야 합니다.",
              },
            })}
            placeholder="닉네임 입력"
            onCheck={checkDuplicate}
          />
          {!isNicknameAvailable && (
            <p className="text-red-500">이미 사용 중인 닉네임입니다.</p>
          )}
          {errors.nickname && (
            <p className="text-red-500">{errors.nickname.message as string}</p>
          )}
          <div className="mt-4 flex justify-center mt-14 gap-4">
            <div
              onClick={nickChange}
              className="px-4 py-2 bg-maincolor text-white rounded-md hover:bg-blue-700 mr-2 cursor-pointer"
            >
              변경하기
            </div>
            <div
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={closeModal}
            >
              취소
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNicknameModal;
