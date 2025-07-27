import { useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { MainSection } from "./sections/MainSection";

/*
  Handle global app state, persist login tokens, and load MainSection
*/
export const App = () => {
  // Lazy initialize from localStorage
  const [accessToken, setAccessTokenState] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [loggedInUserId, setUserIdState] = useState(
    () => localStorage.getItem("userId") || null
  );

  // Wrapper to sync accessToken with both state and localStorage
  const setAccessToken = (token) => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
    setAccessTokenState(token);
  };

  // Wrapper to sync userId with both state and localStorage
  const setUserId = (id) => {
    if (id) {
      localStorage.setItem("userId", id);
    } else {
      localStorage.removeItem("userId");
    }
    setUserIdState(id);
  };

  return (
    <>
      <GlobalStyle />
      <MainSection
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        loggedInUserId={loggedInUserId}
        setUserId={setUserId}
      />
    </>
  );
};
