import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  font-family: "IBM Plex Mono", "Mono";
  font-weight: 500;
  color: black;
}

body {
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 16 px;
  font-weight: 600;
}

img {
  width: 20px;
  height: 20px;
}

textarea:focus,
input:focus {
  outline: 3px solid rgba(255, 173, 173, 255);
}
`;
