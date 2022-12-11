import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/core/Header";
import AllArticles from "./components/user/AllArticles";
import EditProfile from "./components/user/EditUserProfile";
import CreateUser from "./components/user/CreateUser";
import DeleteAccountModal from "./components/user/DeleteAccountModal";
import AssignUserRole from "./components/user/AssignUserRole";
import ViewArticle from "./components/user/ViewArticle";
import { Navigate } from "react-router-dom";

function MainRouter() {
  return (
    <Router>
      <Header />
      <AssignUserRole />
      <DeleteAccountModal />
      <Routes>
        <Route path="/" element={<AllArticles />}></Route>
        <Route path="/editProfile" element={<EditProfile />}></Route>
        <Route path="/viewProfile" element={<ViewArticle />}></Route>
        <Route path="/addUser" element={<CreateUser />}></Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
