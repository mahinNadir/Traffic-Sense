import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

import Prediction from "../screens/Prediction";

const Router = () => {
  // const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path="/" element={<Prediction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
