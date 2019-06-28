import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
//import "./Header.css";
//component
import TabsButton from './TabsButton';
// styles
import {
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Tabs,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import EnquiryIcon from "@material-ui/icons/QuestionAnswer";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import logo from "../image/logo.jpg";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  appBar: {
    backgroundImage: "linear-gradient(90deg, #ffffff 0%, #eceff1 100%)",
    color: "#fafafa",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div>
      <AppBar
        position="static"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        elevation={2}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={3}>
              <IconButton
                className="menuButton"
                edge="start"
                aria-label="Menu"
                onClick={handleDrawerOpen}
              >
                <MenuIcon style={{ color: "#ad1e22" }} />
              </IconButton>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                    Menu
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </div>
                <List>
                  <ListItem
                    button
                    onClick={() =>
                      window.open(
                        "https://calendar.google.com/calendar?cid=a29tbWVyY2UuZmlyZWJhc2VAZ21haWwuY29t",
                        "_blank"
                      )
                    }
                  >
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Calendar" />
                  </ListItem>
                  <ListItem button component={Link} to="/enquiry">
                    <ListItemIcon>
                      <EnquiryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enquiry" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Drawer>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h5"
                style={{ color: "black", textAlign: "center" }}
              >
                <span>
                  React & Ethereum Voting Application{" "}
                  <img src={logo} alt="s" height="42" width="42" />
                </span>
              </Typography>
            </Grid>
          </Grid>
          {/* opens side menu */}
        </Toolbar>
      </AppBar>
      <TabsButton/>
      <Divider/>
    </div>
  );
}

export default Header;
