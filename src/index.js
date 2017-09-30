import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import "typeface-roboto";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
  html {
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    background: #fafafa;
  }

  #root {
    height: 100%;
  }

  .material-icons.md-18 { font-size: 18px; }
  .material-icons.md-24 { font-size: 24px; }
  .material-icons.md-36 { font-size: 36px; }
  .material-icons.md-48 { font-size: 48px; }

`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
