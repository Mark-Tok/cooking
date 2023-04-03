import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LayoutWrapper } from "./LayoutWrapper";
import { LoginForm } from "components/LoginForm";
import { AuthWrapper } from "./AuthWrapper";
import { List, Recipe, Create } from "pages";
import { selectIsAuth } from "../model/redusers/auth";
export const Routres = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <AuthWrapper>
      <LayoutWrapper>
        <Routes>
          <Route path="login" element={!!isAuth ? <List /> : <LoginForm />} />
          <Route path="create" element={<Create />} />
          <Route path="edit">
            <Route path=":id" element={<Create mode={"edit"} />} />
          </Route>

          <Route path="list" element={<List />} />
          <Route path="list">
            <Route path=":id" element={<Recipe />} />

            <Route path="edit:id" element={<Create />} />
          </Route>
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </LayoutWrapper>
    </AuthWrapper>
  );
};
