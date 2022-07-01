import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import ThemeProvider from "react-bootstrap/esm/ThemeProvider"
import "./styles/index.scss"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ThemeProvider dir="rtl">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)