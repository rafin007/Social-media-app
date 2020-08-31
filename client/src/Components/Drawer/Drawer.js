import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { MenuList, MenuItem, ListItemIcon } from "@material-ui/core";
import {
  HomeOutlined,
  MessageOutlined,
  AccountCircleOutlined,
  NotificationsOutlined,
  SupervisorAccountOutlined,
  ImageOutlined,
  GroupOutlined,
  GroupAddOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";
import Avatar from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "3vh",
    backgroundColor: "#000",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ededed",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
  },
  menus: {
    display: "none",
    alignItems: "stretch",
    padding: 0,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  menu: {
    alignSelf: "stretch",
    height: "4rem",
  },
  // title: {
  //     marginLeft: 'auto',
  //     [theme.breakpoints.up('sm')]: {
  //         marginLeft: 0
  //     }
  // }
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { pathname } = useLocation();

  // console.log(pathname);

  //user state
  const user = useSelector((state) => state.auth.user);

  //loading state
  const loading = useSelector((state) => state.auth.loading);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {loading ? (
        <Spinner />
      ) : (
        <Avatar
          image={user && user.avatar && user.avatar}
          width={10}
          height={10}
        />
      )}
      <Typography variant="h5" align="center" gutterBottom color="textPrimary">
        {user && user.name}
      </Typography>
      <Divider />
      <MenuList>
        {/* {['posts', 'followers', 'following', 'requests', 'settings', 'logout'].map((link, i) => {
                    return (
                        <MenuItem component={Link} to={`/${link}`} selected={`/${link}` === pathname} key={i} >
                            {link.toUpperCase()}
                        </MenuItem>
                    );
                })} */}

        <MenuItem
          component={Link}
          to="/posts"
          selected={"/posts" === pathname}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <ImageOutlined />
          </ListItemIcon>
          Posts
        </MenuItem>

        <MenuItem
          component={Link}
          to="/followers"
          selected={"/followers" === pathname}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <GroupOutlined />
          </ListItemIcon>
          Followers
        </MenuItem>

        <MenuItem
          component={Link}
          to="/following"
          selected={"/following" === pathname}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <SupervisorAccountOutlined />
          </ListItemIcon>
          Following
        </MenuItem>

        <MenuItem
          component={Link}
          to="/requests"
          selected={"/requests" === pathname}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <GroupAddOutlined />
          </ListItemIcon>
          Requests
        </MenuItem>

        <MenuItem
          component={Link}
          to="/settings"
          selected={"/settings" === pathname}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem
          component={Link}
          to="/logout"
          selected={"/logout" === pathname}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>
            <ExitToAppOutlined />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuList>

      {/* <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <Typography variant="h6" className={classes.title}>
              Social media
            </Typography>
            <MenuList className={classes.menus}>
              <MenuItem
                component={Link}
                to="/home"
                selected={"/home" === pathname}
                className={classes.menu}
              >
                <HomeOutlined />
              </MenuItem>
              <MenuItem
                component={Link}
                to="/messages"
                selected={"/messages" === pathname}
                className={classes.menu}
              >
                <MessageOutlined />
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                selected={"/profile" === pathname}
                className={classes.menu}
              >
                <AccountCircleOutlined />
              </MenuItem>
              <MenuItem
                component={Link}
                to="/notifications"
                selected={"/notifications" === pathname}
                className={classes.menu}
              >
                <NotificationsOutlined />
              </MenuItem>
            </MenuList>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
