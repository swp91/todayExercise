import { useForm } from "react-hook-form";
import InputField from "../common/InputField";
import { passwordChange } from "../../api/MypageApi";
import { useSetRecoilState } from "recoil";
import { passwordChangepage } from "../../recoil/Mypages";
import { toast } from "react-toastify";

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword = () => {
  const setPassChangePage = useSetRecoilState(passwordChangepage);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordChangeFormData>();

  const onSubmit = async (data: PasswordChangeFormData) => {
    if (data.currentPassword.trim() == "") {
      toast.error("기존 비밀번호를 입력해주세요.");
      return;
    }

    const currentPassword = data.currentPassword.trim();
    const newPassword = data.newPassword.trim();

    try {
      const response = await passwordChange(currentPassword, newPassword);
      console.log(response);
      if (response.data.status === 200) {
        toast.success("비밀번호가 변경되었습니다.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        exitPage();
      } else {
        toast.error("비밀번호가 틀렸습니다.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      console.log(error);
      toast.error("비밀번호 변경실패", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const exitPage = () => {
    setPassChangePage(false);
  };

  // 새로운 비밀번호와 비밀번호 확인이 일치하는지 검사하는 함수
  const validatePassword = (value: string) => {
    return value === watch("newPassword");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center flex-col "
    >
      <h2 className="text-2xl mt-12 mb-20">비밀번호 변경하기</h2>
      <div className="flex flex-col w-3/5">
        <InputField
          label="기존 비밀번호"
          type="password"
          name="currentPassword"
          className="mb-7"
          maxLength={20}
          register={register("currentPassword", { maxLength: 20 })}
        />
        <InputField
          label="새로운 비밀번호"
          type="password"
          name="newPassword"
          maxLength={20}
          register={register("newPassword", {
            minLength: 4,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
          })}
        />
        <p className="text-timered text-sm h-5 my-1">
          {errors.newPassword ? "영어와 숫자를 포함한 4~20글자" : " "}
        </p>
        <InputField
          label="비밀번호 확인"
          type="password"
          name="confirmPassword"
          maxLength={20}
          register={register("confirmPassword", { validate: validatePassword })}
        />
        <p className="text-timered text-sm h-5 my-1">
          {errors.confirmPassword ? "비밀번호가 일치하지 않습니다." : " "}
        </p>
        <div className="flex items-center justify-center gap-20 mt-12">
          <button
            type="submit"
            className="bg-maincolor text-white py-1 px-4 rounded-2xl text-lg hover:opacity-70"
          >
            변경
          </button>
          <div
            className="cursor-pointer border-maincolor border py-1 px-4 rounded-2xl text-lg hover:opacity-70 text-maincolor"
            onClick={exitPage}
          >
            취소
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
