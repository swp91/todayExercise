import GoExerciseBtn from "../components/home/GoExerciseBtn";
import TodayExercise from "../components/home/TodayExercise";
import WeekDays from "../components/home/WeekDays";

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
