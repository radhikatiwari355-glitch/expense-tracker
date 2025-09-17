import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";   // 🔹 App.js ko import kiya

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />   {/* 🔹 App.js ko render kiya */}
  </React.StrictMode>
);
