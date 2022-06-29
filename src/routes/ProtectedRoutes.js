import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Layout from "../components/Layout/Layout";
import Missing from "../components/Missing/Missing";
import Unauthorized from "../components/Unauthorized/Unauthorized";
import RequireAuth from "../components/RequireAuth/RequireAuth";
import ContentTypeBuilder from "../components/ContentTypeBuilder/ContentTypeBuilder";
import ContentTypeManager from "../components/ContentTypeManager/ContentTypeManager";
import Contents from "../components/Contents/Contents";
import UserManager from "../components/UserManager/UserManager";
import Table from "../components/Table/Table";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import User from "../components/Users/User";

function ProtectedRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          {/*allowedRoles={[ROLES.User]}*/}

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="table" element={<Table />} />
            <Route
              path="content-type-builder"
              element={<ContentTypeBuilder />}
            />
            <Route
              path="content-type-manager/*"
              element={<ContentTypeManager />}
            />
            <Route path="contents/*" element={<Contents />} />
            <Route path="user-manager" element={<UserManager />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default ProtectedRoutes;
