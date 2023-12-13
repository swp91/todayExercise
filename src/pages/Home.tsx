import GoExerciseBtn from "../components/Home/GoExerciseBtn";
import TodayExercise from "../components/Home/TodayExercise";
import WeekDays from "../components/Home/WeekDays";

const Home = () => {
  return (
    <div>
      <WeekDays />
      <TodayExercise />
      <GoExerciseBtn />
    </div>
  );
};

export default Home;
