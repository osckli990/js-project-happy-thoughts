import { GlobalStyle } from "./GlobalStyle";

import { MainSection } from "./sections/MainSection";

export const App = () => {
  //Should all code go here?
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

/*move code outside of app*/
