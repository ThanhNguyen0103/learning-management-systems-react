import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import LayoutClient from "./components/layout-client";

function App() {
  return (
    <>
      <LayoutClient />
    </>
  );
}

export default App;
