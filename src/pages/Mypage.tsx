import { useRecoilValue } from "recoil";
import ExerciseHistoryList from "../components/Mypage/ExerciseHistoryList";
import InfoSection from "../components/Mypage/InfoSection";
import { nicknameModal } from "../recoil/Mypages";
import UpdateNicknameModal from "../components/Mypage/UpdateNickModal";

const Mypage = () => {
  const nickModal = useRecoilValue(nicknameModal);
  return (
    <div className="mx-10">
      <InfoSection />
      <ExerciseHistoryList />
      {nickModal && <UpdateNicknameModal />}
    </div>
  );
};

export default Mypage;
