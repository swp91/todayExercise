import Router from "./shared/Router";
import { useEffect } from "react";
import { LoginCheck } from "./api/UserApi";
import { isLoggedInState } from "./recoil/User";
import { useSetRecoilState } from "recoil";

function App() {
  const setLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await LoginCheck();
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
      }
    };

    checkSession();
  }, []);
  return <Router />;
}

export default App;
