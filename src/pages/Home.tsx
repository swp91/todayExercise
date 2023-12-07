import WeekDays from "../components/Home/WeekDays";
import TodayExercise from "../components/Home/TodayExercise";
import GoExerciseBtn from "../components/Home/GoExerciseBtn";

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
