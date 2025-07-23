import { useState, useEffect } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { MainSection } from "./sections/MainSection";

export const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Load from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedId = localStorage.getItem("userId");

    if (storedToken && storedId) {
      setAccessToken(storedToken);
      setUserId(storedId);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainSection
        accessToken={accessToken}
        loggedInUserId={userId}
        setAccessToken={setAccessToken}
        setUserId={setUserId}
      />
    </>
  );
};
/*move code outside of app?*/
