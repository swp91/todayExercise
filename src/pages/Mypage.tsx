import { useRecoilValue } from "recoil";
import ExerciseHistoryList from "../components/Mypage/ExerciseHistoryList";
import InfoSection from "../components/Mypage/InfoSection";
import { nicknameModal, passwordChangepage } from "../recoil/Mypages";
import UpdateNicknameModal from "../components/Mypage/UpdateNickModal";
import UpdatePassword from "../components/Mypage/UpdatePassword";

const Mypage = () => {
  const nickModalOpen = useRecoilValue(nicknameModal);
  const passwordChangeOpen = useRecoilValue(passwordChangepage);
  return (
    <div className="mx-10 mobile:mx-4">
      {passwordChangeOpen ? (
        <UpdatePassword />
      ) : (
        <>
          <InfoSection />
          <ExerciseHistoryList />
          {nickModalOpen && <UpdateNicknameModal />}
        </>
      )}
    </div>
  );
};

export default Mypage;
