// src/main.tsx
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

// import "modern-normalize";
import "./index.css";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./components/App/App";


// // import "normalize";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );