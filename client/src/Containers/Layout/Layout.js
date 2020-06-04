import React, { useState } from 'react';
import Main from '../Main/Main';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from '../../Auth/Signup/Signup';
import Signin from '../../Auth/Signin/Signin';
import { useSelector } from 'react-redux';

const Layout = () => {

    //get isAuthenticated state
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    //check if the user is authenticated and redirect accordingly
    if (!isAuthenticated) { //change it to !isAuthenticated later
        return (
            <>
                <Switch>
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/" exact component={Signup} />
                </Switch>
                <Redirect to="/" />
            </>
        );
    }
    else {
        return <Main />;
    }
}

export default Layout;
