import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";

import { Context } from "../index";
import { authRoutes, publicRoutes } from "../routes";
import { ZERO } from "../utils/consts";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Routes>
      {(user.isAuth ? authRoutes : publicRoutes).map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path="*" element={<Navigate to={ZERO} />} />
    </Routes>
  );
});

export default AppRouter;
