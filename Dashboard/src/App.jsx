import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom"; // Changed "react-router" to "react-router-dom"
import Main from "./component/main";
import Login from "./Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> Route for the Login component */}
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
