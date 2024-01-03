import Router from "./shared/Router";
import { useEffect } from "react";
import { LoginCheck } from "./api/UserApi";
import { isLoggedInState } from "./recoil/User";
import { useSetRecoilState } from "recoil";
import { exericiseWeekRecord } from "./api/ExerciseApi";
import { weekrecordsState } from "./recoil/ExerciseRecords";

function App() {
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const setRecords = useSetRecoilState(weekrecordsState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await LoginCheck();
        if (response.data.status === 200) {
          setLoggedIn(true);
          const res = await exericiseWeekRecord();
          setRecords(res.data.data);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        setLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return <Router />;
}

export default App;
