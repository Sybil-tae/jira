/*
 * @description:
 * @author:
 * @lastEditors:
 * @Date: 2021-04-29 09:50:09
 */

import { Navigate, Route, Routes } from "react-router";

import { EpicScreen } from "screens/Epic";
import { KanbanScreen } from "screens/Kanban";
import { Link } from "react-router-dom";
import React from "react";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      {/* to里面加上/表示从根路由开始匹配 */}
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen/>}></Route>
        <Route path={'/epic'} element={<EpicScreen />}></Route>
        <Navigate to={window.location.pathname+'/kanban'} />
      </Routes>
    </div>
  );
};
