import ExerciseHistoryList from "../components/mypage/ExerciseHistoryList";
import InfoSection from "../components/mypage/InfoSection";

const Mypage = () => {
  return (
    <div className="mx-10">
      <InfoSection />
      <ExerciseHistoryList />
    </div>
  );
};

export default Mypage;
