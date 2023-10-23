import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";
import { MediaContextProvider } from "./Context/MediaContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { SearchContextProvider } from "./Context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SearchContextProvider>
    <AuthContextProvider>
      <MediaContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MediaContextProvider>
    </AuthContextProvider>
  </SearchContextProvider>
);

reportWebVitals();
