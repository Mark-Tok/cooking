import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutWrapper } from "./LayoutWrapper";
import { LoginForm } from "components/LoginForm";
import { AuthWrapper } from "./AuthWrapper";
import { List, Recipe } from "pages";
import { selectIsAuth } from "../model/redusers/auth";
export const Routres = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <AuthWrapper>
      <LayoutWrapper>
        <Routes>
          <Route path="login" element={!!isAuth ? <List /> : <LoginForm />} />
          <Route path="list" element={<List />} />
          <Route path="list">
            <Route path=":id" element={<Recipe />} />
          </Route>
        </Routes>
      </LayoutWrapper>
    </AuthWrapper>
  );
};
