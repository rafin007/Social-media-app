import React, { Suspense, useEffect } from "react";
import Layout from "./Containers/Layout/Layout";

import { ThemeProvider } from "@material-ui/core";
import theme from "./Theme/Theme";
import { BrowserRouter } from "react-router-dom";

//redux
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./Actions/auth";

//when the app is loaded, if there is a token found in localStorage, then set it to axios headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //load the user that is logged in, if any
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Suspense fallback={""}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <div className="App">
              <Layout />
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
};

export default App;
