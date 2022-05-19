import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
  selectSearchResults,
  selectPageNumber,
} from "../../slices/tvShowSlice";
import { showStatus, setSearchField } from "../../constants/actionTypes";
import { logout } from "../../slices/authSlice";
import "../features.css";

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
      marginRight: "30px",
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
  const history = useHistory();
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const page = useSelector(selectPageNumber);
  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    dispatch(setSearchField(""));
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    dispatch(setSearchField(""));
  };

  const handleInputChange = async (event) => {
    await dispatch(setSearchField(event.target.value));
    history.push(`/search/${event.target.value}`);
    await dispatch(showStatus("search"));
    await dispatch(searchTvShowsByName(event.target.value, page));
  };

  function handleMostPopularClick() {
    dispatch(showStatus("popular"));
    dispatch(setSearchField(""));
    dispatch(mostPopularTvShows(page));
  }

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      dispatch(setSearchField(""));
      setTimeout(() => history.push("/"), 700);
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
        <MenuItem component={Link} to="/favorites">
          <IconButton color="inherit">
            <TvIcon />
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
        <p>
          <span>{user ? user.userName : ""}</span> &nbsp;
          {!user ? "Register/Login" : "Logout"}
        </p>
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
            sx={{ marginRight: "30px", border: "1px solid #fff" }}
            aria-label="open drawer"
            onClick={handleMostPopularClick}
          >
            <Typography className={classes.title} variant="h5" noWrap>
              HOME
            </Typography>
            <HomeIcon color="white" fontSize="large" />
            {"  "}
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            TV SHOW BROWSER
          </Typography>
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
              value={searchResults}
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
                sx={{ marginRight: "15px", border: "1px solid #fff" }}
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
              sx={{ border: "1px solid #fff" }}
            >
              <Typography variant="h6">
                <span>{user ? user.userName : ""}</span>
                <AccountCircle />
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
    </div>
  );
}
