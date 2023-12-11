import ExerciseHistoryList from "../components/Mypage/ExerciseHistoryList";
import InfoSection from "../components/Mypage/InfoSection";

const Mypage = () => {
  return (
    <div className="mx-10">
      <InfoSection />
      <ExerciseHistoryList />
    </div>
  );
};

export default Mypage;
