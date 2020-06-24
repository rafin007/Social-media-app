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
import ViewProfile from '../../Components/Profile';
import CreatePost from '../../SubViews/CreatePost/CreatePost';

//routes contain all the routes after the user has logged in

const Routes = () => {
    return (
        <Switch>
            <Route path="/posts" exact component={Posts} />
            <Route path="/followers" exact component={Followers} />
            <Route path="/following" exact component={Following} />
            <Route path="/requests" exact component={Requests} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/messages" exact component={MessagesView} />
            <Route path="/profile" exact component={ProfileView} />
            <Route path="/notifications" exact component={NotificationsView} />
            <Route path="/home" exact component={HomeView} />
            <Route path="/profile/:id" exact component={ViewProfile} />
            <Route path="/followers/:user_id" exact component={Followers} />
            <Route path="/following/:user_id" exact component={Following} />
            <Route path="/create" exact component={CreatePost} />
            {/* <Route path="/post/:id" exact component={} /> */}
        </Switch>
    );
}

export default Routes;
