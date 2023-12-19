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
        const response = await LoginCheck();
        if (response.data.status === 200) {
          setLoggedIn(true);
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
