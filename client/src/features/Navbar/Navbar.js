import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import {
  selectStatus,
  selectResultIds,
  selectPageNumber,
  mostPopularTvShows,
  onTheAirTvShows,
  topRatedTvShows,
} from "../../slices/tvShowSlice";
import { showStatus, setSearchField } from "../../constants/actionTypes";
import Card from "../Card/Card";
import "../features.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const status = useSelector(selectStatus);
  const showIds = useSelector(selectResultIds);
  const page = useSelector(selectPageNumber);
  const classes = useStyles();
  const dispatch = useDispatch();

  async function handleNewClick() {
    await dispatch(showStatus("onTheAir"));
    await dispatch(setSearchField(""));
    await dispatch(onTheAirTvShows(page));
  }
  async function handleMostPopularClick() {
    await dispatch(showStatus("popular"));
    await dispatch(setSearchField(""));
    await dispatch(mostPopularTvShows(page));
  }
  async function handleTopRatedClick() {
    await dispatch(showStatus("topRated"));
    await dispatch(setSearchField(""));
    await dispatch(topRatedTvShows(page));
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar variant="dense">
            <ButtonGroup
              size="large"
              color="secondary"
              aria-label="large outlined primary button group"
            >
              <Button onClick={handleMostPopularClick}>
                <Typography
                  variant={status === "popular" ? "h5" : "h6"}
                  color={status === "popular" ? "textPrimary" : "textSecondary"}
                  fontWeight={status === "popular" ? "bold" : "medium"}
                  noWrap
                >
                  POPULAR
                </Typography>{" "}
              </Button>
              <Button onClick={handleNewClick}>
                <Typography
                  variant={status === "onTheAir" ? "h5" : "h6"}
                  color={
                    status === "onTheAir" ? "textPrimary" : "textSecondary"
                  }
                  fontWeight={status === "onTheAir" ? "bold" : "medium"}
                  noWrap
                >
                  NEW
                </Typography>{" "}
              </Button>
              <Button onClick={handleTopRatedClick}>
                <Typography
                  variant={status === "topRated" ? "h5" : "h6"}
                  color={
                    status === "topRated" ? "textPrimary" : "textSecondary"
                  }
                  fontWeight={status === "topRated" ? "bold" : "medium"}
                  noWrap
                >
                  TOP RATED
                </Typography>{" "}
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </div>
      <br />
      <div className="tv-list">
        {showIds?.map((showId) => (
          <Card key={showId} id={showId} />
        ))}
      </div>
    </>
  );
}
