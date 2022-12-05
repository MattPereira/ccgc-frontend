import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../Auth/UserContext";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ccgcLogo from "../../../assets/ccgc_logo_nav.png";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";

/** Navbar bar for site that shows on every page
 *
 *
 * Logged out users see login and signup
 *
 * Rendered by App
 */

const pages = ["Tournaments", "Standings", "Members", "Greenies", "Courses"];

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

  const navDrawer = (
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
            fontSize: "1.25rem",
            textDecoration: "none",
          }}
        >
          Contra Costa Golf Club
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
        {pages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              component={NavLink}
              to={`/${item}`}
              sx={{ textAlign: "center" }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontSize: "1.5rem",
                  letterSpacing: "0.1rem",
                  fontFamily: "Varela Round",
                  color: "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  //destructuring "window" from props
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="static"
        color="dark"
        sx={{
          // backgroundImage:
          //   "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
          backgroundColor: "black",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyConent: "center" }}>
            <Box
              sx={{
                width: "83.406px",
                textAlign: "center",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <NavLink to="/">
                <Box
                  component="img"
                  alt="ccgc logo"
                  src={ccgcLogo}
                  sx={{
                    height: "40px",
                  }}
                />
              </NavLink>
            </Box>

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

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              justifyContent="center"
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  component={NavLink}
                  to={`/${page.toLowerCase()}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "Varela Round",
                    fontWeight: "bold",
                    letterSpacing: ".1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  {page}
                </Button>
              ))}
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
                <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                  <Button
                    component={NavLink}
                    to="/login"
                    variant="contained"
                    sx={{
                      fontFamily: "Varela Round",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "30px",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
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
          {navDrawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
