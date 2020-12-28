import React from "react";
import { Switch, Route } from "react-router-dom";
const Posts = React.lazy(() => import("../../SubViews/Posts"));
const Followers = React.lazy(() => import("../../SubViews/Followers"));
const Following = React.lazy(() => import("../../SubViews/Following"));
const Requests = React.lazy(() => import("../../SubViews/Requests"));
const Settings = React.lazy(() => import("../../SubViews/Settings"));
const Logout = React.lazy(() => import("../../SubViews/Logout"));
const ProfileView = React.lazy(() => import("../../Views/Profile/ProfileView"));
const NotificationsView = React.lazy(() =>
  import("../../Views/Notifications/NotificationsView")
);
const HomeView = React.lazy(() => import("../../Views/Home/HomeView"));
const ViewProfile = React.lazy(() => import("../../Components/Profile"));
const CreatePost = React.lazy(() =>
  import("../../SubViews/CreatePost/CreatePost")
);
const SinglePost = React.lazy(() =>
  import("../../SubViews/SinglePost/SinglePost")
);
const EditPost = React.lazy(() => import("../../SubViews/EditPost/EditPost"));

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
      <Route path="/profile" exact component={ProfileView} />
      <Route path="/notifications" exact component={NotificationsView} />
      <Route path="/home" exact component={HomeView} />
      <Route path="/profile/:id" exact component={ViewProfile} />
      <Route path="/followers/:user_id" exact component={Followers} />
      <Route path="/following/:user_id" exact component={Following} />
      <Route path="/create" exact component={CreatePost} />
      <Route path="/edit/:post_id" exact component={EditPost} />
      <Route path="/post/:post_id" exact component={SinglePost} />
      {/* <Route path="/changePassword" exact component={ChangePassword} /> */}
    </Switch>
  );
};

export default Routes;
