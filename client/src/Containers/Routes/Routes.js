import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Posts from '../../SubViews/Posts';
import Followers from '../../SubViews/Followers';
import Following from '../../SubViews/Following';
import Requests from '../../SubViews/Requests';
import Settings from '../../SubViews/Settings';
import Logout from '../../SubViews/Logout';
import MessagesView from '../../Views/Messages/MessagesView';
import ProfileView from '../../Views/Profile/ProfileView';
import NotificationsView from '../../Views/Notifications/NotificationsView';
import HomeView from '../../Views/Home/HomeView';

//routes contain all the routes after the user has logged in

const Routes = () => {
    return (
        <Switch>
            <Route path="/posts" component={Posts} />
            <Route path="/followers" component={Followers} />
            <Route path="/following" component={Following} />
            <Route path="/requests" component={Requests} />
            <Route path="/settings" component={Settings} />
            <Route path="/logout" component={Logout} />
            <Route path="/messages" component={MessagesView} />
            <Route path="/profile" component={ProfileView} />
            <Route path="/notifications" component={NotificationsView} />
            <Route path="/home" component={HomeView} />
        </Switch>
    );
}

export default Routes;
