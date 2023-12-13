import WeekDays from "../components/home/WeekDays";
import TodayExercise from "../components/home/TodayExercise";
import GoExerciseBtn from "../components/home/GoExerciseBtn";

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
