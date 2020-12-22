import { ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTheme } from "./Actions/auth";
import Layout from "./Containers/Layout/Layout";
import theme from "./Theme/Theme";

const ThemeLayout = () => {
  const dispatch = useDispatch();

  //check if the user is logged in
  const { isAuthenticated } = useSelector((state) => state.auth);

  //theme state
  const userTheme = useSelector((state) => state.auth.theme);

  //get current theme from user backend
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentTheme());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ThemeProvider theme={theme(userTheme)}>
      <div className="App">
        <Layout />
      </div>
    </ThemeProvider>
  );
};

export default ThemeLayout;
