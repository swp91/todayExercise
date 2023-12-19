import React, { useRef } from "react";
import { profileImageChange } from "../../api/MypageApi";
import { toast } from "react-toastify";
import { UserProfile } from "../../recoil/Mypages";
import { useImageCompression } from "./UseMyPageHooks";

type ProfilePictureProps = {
  myInfo: UserProfile | null;
  setMyInfo: (userInfo: UserProfile | null) => void;
};

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  myInfo,
  setMyInfo,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { compressImage } = useImageCompression();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      try {
        const compressedFile = await compressImage(file);
        const formData = new FormData();
        if (compressedFile) {
          formData.append("imageFile", compressedFile);
        }
        const response = await profileImageChange(formData);
        if (myInfo) {
          const updatedInfo: UserProfile = {
            ...myInfo,
            profileImage: response.data.data,
          };
          setMyInfo(updatedInfo);
        }
        toast.success("프로필 이미지 변경완료", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("프로필 이미지 전송실패", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <img
        className="w-24 h-24 rounded-[50%] cursor-pointer"
        src={
          myInfo && myInfo.profileImage !== "null"
            ? myInfo.profileImage
            : "/img/profiledefault.svg"
        }
        alt=""
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      />
    </div>
  );
};

export default ProfilePicture;
