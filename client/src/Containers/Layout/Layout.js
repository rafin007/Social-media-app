import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "../../Auth/Signup/Signup";
import Signin from "../../Auth/Signin/Signin";
import { useSelector } from "react-redux";
import RecoverPassword from "../../Auth/RecoverPassword/RecoverPassword";
import WriteEmail from "../../Auth/WriteEmail/WriteEmail";
//lazy import main
const Main = React.lazy(() => import("../Main/Main"));

const Layout = () => {
  //get isAuthenticated state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //check if the user is authenticated and redirect accordingly
  if (!isAuthenticated) {
    //change it to !isAuthenticated later
    return (
      <>
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route
            path="/recoverPassword/:token"
            exact
            component={RecoverPassword}
          />
          <Route path="/writeEmail" exact component={WriteEmail} />
          <Route path="/" exact component={Signin} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  } else {
    return <Main />;
  }
};

export default Layout;
