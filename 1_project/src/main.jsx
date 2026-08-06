import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShowData from "./Componant/ShowData.jsx";
import { Provider } from "react-redux";
import { MenuStore } from "./redux/MenuStore.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={MenuStore}>
    <App />
  </Provider>
);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import ShowData from "./Componant/ShowData.jsx";

// createRoot(document.getElementById("root")).render(
//   <ShowData>
//     <App />
//   </ShowData>
// );
