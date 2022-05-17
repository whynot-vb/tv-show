import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SvgIcon from "@mui/material/SvgIcon";

import MoreIcon from "@material-ui/icons/MoreVert";
import TvIcon from "@material-ui/icons/Tv";

import {
  searchTvShowsByName,
  mostPopularTvShows,
} from "../../slices/tvShowSlice";
import {
  showStatus,
  isDetailsOn,
  isEpisodesPageOn,
  clearElements,
} from "../../constants/actionTypes";
import { logout } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "26ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function SearchBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleInputChange = async (event) => {
    setSearchFieldValue(event.target.value);
    dispatch(clearElements());
    await dispatch(isDetailsOn(false));
    await dispatch(isEpisodesPageOn(false));

    await dispatch(showStatus("search"));
    await dispatch(searchTvShowsByName(event.target.value, 1));
  };

  function handleMostPopularClick() {
    dispatch(isDetailsOn(false));
    dispatch(clearElements());
    dispatch(isEpisodesPageOn(false));
    dispatch(showStatus("popular"));
    dispatch(mostPopularTvShows(1));
  }

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
    } else return;
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user && token && (
        <MenuItem>
          <IconButton color="inherit">
            <TvIcon component={Link} to="/auth" />
          </IconButton>
          <p>Favorites</p>
        </MenuItem>
      )}
      <MenuItem component={Link} to="/auth" onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{!user ? "Register/Login" : "Logout"}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            sx={{ marginRight: "20px" }}
            aria-label="open drawer"
            onClick={handleMostPopularClick}
          >
            <HomeIcon color="white" fontSize="large" />
            {"  "}
            <Typography className={classes.title} variant="h5" noWrap>
              TV SHOW BROWSER
            </Typography>
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search tv shows by name …"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleInputChange}
              value={searchFieldValue}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {user && token && (
              <IconButton
                component={Link}
                to="/favorites"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ marginRight: "15px" }}
              >
                <Typography variant="h6">Favorites </Typography>
                <TvIcon />
              </IconButton>
            )}
            <IconButton
              component={Link}
              to="/auth"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleLogout}
              color="inherit"
            >
              <AccountCircle />
              <Typography variant="h6">
                {!user ? "Register/Login" : "Logout"}
              </Typography>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}
