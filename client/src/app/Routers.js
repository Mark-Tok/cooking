import { Route, Routes, useParams, red } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutWrapper } from "./LayoutWrapper";
import { LoginForm } from "components/LoginForm";
import { AuthWrapper } from "./AuthWrapper";
import { List } from "pages/List";
import { selectToken, selectIsAuth } from "../model/redusers/auth";
import { useContext } from "react";
import { AuthContext } from "./AuthWrapper";
export const Routres = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <AuthWrapper>
      <LayoutWrapper>
        <Routes>
          <Route path="login" element={!!isAuth ? <List /> : <LoginForm />} />
          <Route path="list" element={<List />} />
        </Routes>
      </LayoutWrapper>
    </AuthWrapper>
  );
};
