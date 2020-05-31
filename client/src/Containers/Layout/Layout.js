import React, { useState } from 'react';
import Main from '../Main/Main';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from '../../Auth/Signup/Signup';
import Signin from '../../Auth/Signin/Signin';
import { useSelector } from 'react-redux';

const Layout = () => {

    // const auth = (
    //     <Switch>
    //         <Route path="/signin" component={Signin} />
    //         <Route path="/" exact component={Signup} />
    //     </Switch>
    // );

    //get isAuthenticated state
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    //check if the user is authenticated and redirect accordingly
    if (!isAuthenticated) {
        return (
            <>
                <Switch>
                    <Route path="/signin" component={Signin} />
                    <Route path="/" exact component={Signup} />
                </Switch>
                <Redirect to="/" />
            </>
        );
    }
    else {
        return <Main />;
    }

    // return (
    //     <div>
    //         {/* signup */}
    //         {/* signin */}
    //         {/* routing */}
    //         {auth}
    //         {isAuthenticated && <Main />}
    //     </div>
    // );
}

export default Layout;
