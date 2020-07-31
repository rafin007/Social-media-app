import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "../../Auth/Signup/Signup";
import Signin from "../../Auth/Signin/Signin";
import { useSelector } from "react-redux";
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
          <Route path="/signin" exact component={Signin} />
          <Route path="/" exact component={Signup} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  } else {
    return <Main />;
  }
};

export default Layout;
