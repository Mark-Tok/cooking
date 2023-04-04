import { Layout, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuth,
  deleteToken,
  fetchListRecipes,
} from "model";
import logo from "../assets/logo.png";
import { useEffect } from "react";
const { Header, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 134,
  paddingInline: 50,
  zIndex: 100,
  lineHeight: "64px",
  marginBottom: "20px",
  backgroundColor: "#b9e0bd",
  display: "flex",
  aligItems: "center",
  justifyContent: "space-between",
  margin: 0,
  padding: 0,
};

export const LayoutWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigation = useNavigate();
  const logOut = () => {
    window.localStorage.removeItem("token");
    dispatch(deleteToken());
  };
  useEffect(() => {
    dispatch(fetchListRecipes());
  }, [dispatch]);
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", backgroundColor: "#b9e0bd", height: "100vh" }}
      size={[0, 48]}
    >
      <Layout style={{ backgroundColor: "#b9e0bd", padding: "0 150px" }}>
        <Header style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              onClick={() => navigation("/")}
              style={{ width: "20%", cursor: "pointer" }}
              alt="logo"
              src={logo}
            />
          </div>
          <div>
            {isAuth ? (
              <button onClick={logOut}>Выйти</button>
            ) : (
              <Link to="login">Войти</Link>
            )}
          </div>
        </Header>
      </Layout>
      <Layout style={{ backgroundColor: "#b9e0bd", padding: "0 150px" }}>
        <Content>{children}</Content>
      </Layout>
    </Space>
  );
};
