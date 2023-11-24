import React, { useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  saveToken,
  selectLoading,
  selectStatusPostRecipeSuccess,
} from "model";
import { Spin } from "antd";

const spinStyle = {
  backgroundColor: "white",
  position: "absolute",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const AuthWrapper = ({ children }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const token = window.localStorage.getItem("token");
  const savedToken = useSelector(selectToken);
  const loadingStatus = useSelector(selectLoading);
  const isLoading = loadingStatus === "loading";
  const pathLocation = window.location.pathname;
  const recipedCreated = useSelector(selectStatusPostRecipeSuccess);

  //redirect after registration
  useEffect(() => {
    if (!!savedToken) {
      navigation("/list");
    }
  }, [savedToken]);
  
  console.log(pathLocation, 'pathLocation')
  useEffect(() => {
    if (!!recipedCreated) {
      navigation("/list");
    }
  }, [recipedCreated]);

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
