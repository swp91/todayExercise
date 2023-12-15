import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface FormData {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  currentPassword?: string;
  newPassword?: string;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  register: UseFormRegisterReturn;
  type?: string;
  onCheck?: () => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  type = "text",
  onCheck,
  placeholder,
  className,
  maxLength,
}) => {
  return (
    <div className="flex flex-col">
      <label className="ml-2 mb-1 font-bold">{label}</label>
      <div className="flex">
        <input
          {...register}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${className} flex-1 w-full h-10 border rounded-[20px] border-itemgray p-4 placeholder09`}
          maxLength={maxLength}
        />
        {onCheck && (
          <button
            type="button"
            onClick={onCheck}
            className="ml-4 w-28 h-10 rounded-[20px] text-white bg-[#687280]"
          >
            중복 확인
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
