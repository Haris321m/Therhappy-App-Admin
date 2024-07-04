import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom"; // Changed "react-router" to "react-router-dom"
import Main from "./component/main";
import Login from "./Login/Login";
import SignupForm from "./Login/signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
