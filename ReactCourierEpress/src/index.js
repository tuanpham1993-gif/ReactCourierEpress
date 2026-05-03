import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/adminLayout.css";
import "./styles/dashboard.css";
import "./styles/shipmentform.css";
import "./styles/tracking.css";
import "./styles/branches.css";
import "./styles/agent.css";
import "./styles/assignOrders.css";
import "./styles/customers.css";
import "./styles/invoices.css";
import "./styles/reports.css";
import "./styles/setting.css";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
