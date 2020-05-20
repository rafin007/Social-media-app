import React, { useState } from 'react';
import Main from '../Main/Main';
import { Switch, Route } from 'react-router-dom';
import Signup from '../../Auth/Signup/Signup';
import Signin from '../../Auth/Signin/Signin';

const Layout = () => {

    const [isAuth, setIsAuth] = useState(false);

    const auth = (
        <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/" exact component={Signup} />
        </Switch>
    );

    return (
        <div>
            {/* signup */}
            {/* signin */}
            {/* routing */}
            {auth}
            {isAuth && <Main />}
        </div>
    );
}

export default Layout;
