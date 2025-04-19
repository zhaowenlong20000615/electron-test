import React, { memo } from "react";
import { Outlet } from "react-router";
import ControlBtns from "./components/ControlBtns";
const App = memo(() => {
  return (
    <>
      <ControlBtns />
      <Outlet />
    </>
  );
});

export default App;
