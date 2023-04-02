import React, { useEffect, useRef, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, saveToken, selectLoading } from "model/redusers/auth";
import { Spin } from "antd";
const token = window.localStorage.getItem("token");

const spinStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // zIndex:100
};
//жопа в том что когда мы удаляем токен, в контексте он остаётся и
// роутеры не срабатывают так как надо
export const AuthContext = createContext({});

export const AuthWrapper = ({ children }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const token = window.localStorage.getItem("token");
  const savedToken = useSelector(selectToken);
  const loadingStatus = useSelector(selectLoading);
  const isLoading = loadingStatus === "loading";
  const pathLocation = window.location.pathname;

  const tokenRef = useRef(token);

  //redirect after registration
  useEffect(() => {
    if (!!savedToken) {
      navigation("/list");
    }
  }, [savedToken]);

  //save token for use in redux
  useEffect(() => {
    if (!!token) {
      dispatch(saveToken(token));
    }
  }, [dispatch]);

  //rediredct from login
  useEffect(() => {
    if (pathLocation.includes("login") && !!savedToken) {
      navigation("/list");
    }
  }, [savedToken]);

  return (
    <Spin
      spinning={isLoading}
      style={{ ...spinStyle, opacity: isLoading ? 0.5 : 0 }}
    >
      {children}
    </Spin>
  );
};
