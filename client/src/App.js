import React, { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

//redux
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./Actions/auth";
import ThemeLayout from "./ThemeLayout";
import setAxios from "./setAxios";

//set axios base URL
setAxios();

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
          <ThemeLayout userTheme={store.getState().auth.theme} />
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
};

export default App;
