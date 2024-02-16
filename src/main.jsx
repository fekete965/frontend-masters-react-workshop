import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./Workshop";

const rootNode = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootNode
);
