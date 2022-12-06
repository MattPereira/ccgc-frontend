import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../Auth/UserContext";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  ListItemIcon,
  // SvgIcon,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import ccgcLogo from "../../../assets/ccgc_logo_nav.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ListIcon from "@mui/icons-material/List";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

/** Navbar bar for site that shows on every page
 *
 * Logged out users see login and signup
 *
 * Rendered by App component
 */

const Navbar = ({ window, logout }) => {
  const { currentUser } = useContext(UserContext);
  console.debug("Navbar", "currentUser=", currentUser);
  console.debug("Navbar");

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let pages = [
    {
      text: "Home",
      icon: (
        // <SvgIcon color="inherit" fontSize="large">
        //   <CcgcLogo />
        // </SvgIcon>
        <Box component="img" src={ccgcLogo} sx={{ width: "40px" }} />
      ),
      path: "/",
    },
    {
      text: "Tournaments",
      icon: <EmojiEventsIcon fontSize="large" />,
      path: "/tournaments",
    },
    {
      text: "Standings",
      icon: <ListIcon fontSize="large" />,
      path: "/standings",
    },
    {
      text: "Members",
      icon: <GroupsIcon fontSize="large" />,
      path: "/members",
    },
    {
      text: "Greenies",
      icon: <GolfCourseIcon fontSize="large" />,
      path: "/greenies",
    },
    {
      text: "Courses",
      icon: <SportsGolfIcon fontSize="large" />,
      path: "/courses",
    },
    {
      text: "Dashboard",
      icon: <DashboardOutlinedIcon fontSize="large" />,
      path: "/dashboard",
    },
  ];

  // filter out the dashboard page if the logged in user is not an admin or if anonymous user
  if (!currentUser || !currentUser.isAdmin) {
    pages = pages.filter((page) => page.text !== "Dashboard");
  }

  /****** THE MOBILE DRAWER TRIGGERED BY HAMBURGER ICON ******/

  const mobileDrawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "black" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleDrawerToggle}
          color="inherit"
        >
          <MenuIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            my: 2,
            color: "white",
            fontFamily: "Cubano",
            fontSize: "1.75rem",
            letterSpacing: "0.2rem",
            textDecoration: "none",
          }}
        >
          CCGC
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleDrawerToggle}
          color="inherit"
        >
          <CloseIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Divider sx={{ marginBottom: "0px !important" }} />
      <List sx={{ py: 3 }}>
        {pages.map((page) => (
          <ListItem
            key={page.text}
            disablePadding
            component={NavLink}
            to={page.path}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={page.text}
                primaryTypographyProps={{
                  fontSize: "1.5rem",
                  letterSpacing: "0.1rem",
                  fontFamily: "Cubano",
                  color: "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  /********** THE SIDEBAR **********/

  const StyledDrawer = styled(Drawer)({
    width: "150px",
    ".MuiDrawer-paper": {
      width: "150px",
      backgroundColor: "#eeeeee",
    },
  });

  const StyledOuterGrid = styled(Grid)({
    height: "100vh",
    justifyContent: "center",
    flexWrap: "nowrap",
  });

  const StyledListItemText = styled(ListItemText)({
    ".MuiTypography-root": {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: 600,
      color: "black",
    },
  });

  const sidebar = (
    <StyledOuterGrid
      container
      direction="column"
      sx={{ justifyContent: "space-between", py: 3 }}
    >
      <Grid item>
        <List>
          {pages.map((page, index) => (
            <ListItem
              key={page.text}
              disablePadding
              component={Link}
              to={page.path}
            >
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ListItemIcon sx={{ color: "black", justifyContent: "center" }}>
                  {page.icon}
                </ListItemIcon>
                <StyledListItemText>{page.text}</StyledListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <Box>
          {currentUser ? (
            <>
              <ListItem disablePadding component={Link} to={"/profile"}>
                <ListItemButton
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ListItemIcon
                    sx={{ color: "black", justifyContent: "center" }}
                  >
                    <Avatar
                      alt="Member Initials"
                      sx={{
                        color: "white",
                        bgcolor: "black",
                        fontFamily: "Itim",
                        fontWeight: 700,
                      }}
                    >
                      {currentUser.firstName[0] + currentUser.lastName[0]}
                    </Avatar>
                  </ListItemIcon>
                  <StyledListItemText
                    primary={currentUser.firstName + " " + currentUser.lastName}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => logout()}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ListItemIcon
                    sx={{ color: "black", justifyContent: "center" }}
                  >
                    <LogoutOutlinedIcon fontSize="large" />
                  </ListItemIcon>
                  <StyledListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding component={Link} to={"/login"}>
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ListItemIcon sx={{ color: "black", justifyContent: "center" }}>
                  <LoginIcon fontSize="large" />
                </ListItemIcon>
                <StyledListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}

          {/* {userItems.map((page, index) => (
            <ListItem
              key={page.text}
              disablePadding
              component={Link}
              to={page.path}
            >
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ListItemIcon sx={{ color: "black", justifyContent: "center" }}>
                  {page.icon}
                </ListItemIcon>
                <StyledListItemText primary={page.text} />
              </ListItemButton>
            </ListItem>
          ))} */}
          {/* <ListItem disablePadding component={Link}>
            {currentUser ? (
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon sx={{ color: "black" }}>
                  <LogoutOutlinedIcon fontSize="large" />
                </ListItemIcon>
                <StyledListItemText primary="Logout" />
              </ListItemButton>
            ) : null}
          </ListItem> */}
        </Box>
      </Grid>
    </StyledOuterGrid>
  );

  //destructuring "window" from props
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <StyledDrawer
        variant="permanent"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {sidebar}
      </StyledDrawer>
      <AppBar
        position="static"
        color="dark"
        sx={{
          backgroundColor: "black",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyConent: "center" }}>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
                sx={{ padding: "0px" }}
              >
                <MenuIcon fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "white !important",
                  fontFamily: "Fredoka One",
                  letterSpacing: ".25rem",
                  fontSize: "1.5rem",
                  textDecoration: "none",
                }}
              >
                CCGC
              </Typography>
            </Box>
            {currentUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Member Initials"
                      sx={{
                        color: "black",
                        bgcolor: "white",
                        fontFamily: "Itim",
                        fontWeight: 700,
                      }}
                    >
                      {currentUser.firstName[0] + currentUser.lastName[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={NavLink}
                    to="/profile"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  {currentUser.isAdmin ? (
                    <MenuItem
                      component={NavLink}
                      to="/dashboard"
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  ) : null}

                  <MenuItem
                    component={NavLink}
                    to="/"
                    onClick={() => {
                      handleCloseUserMenu();
                      logout();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    flexGrow: 0,
                    width: "35px",
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <NavLink
                    to="/login"
                    sx={{
                      color: "white !important",
                    }}
                  >
                    <LoginIcon sx={{ fontSize: "30px", color: "white" }} />
                  </NavLink>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor={"top"}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {mobileDrawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
