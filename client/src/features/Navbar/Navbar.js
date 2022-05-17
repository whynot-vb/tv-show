import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import {
  selectStatus,
  selectResultIds,
  mostPopularTvShows,
  onTheAirTvShows,
  topRatedTvShows,
} from "../../slices/tvShowSlice";
import {
  showStatus,
  isDetailsOn,
  isEpisodesPageOn,
} from "../../constants/actionTypes";
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
  const classes = useStyles();
  const dispatch = useDispatch();

  async function handleNewClick() {
    await dispatch(isDetailsOn(false));
    await dispatch(isEpisodesPageOn(false));
    await dispatch(showStatus("onTheAir"));
    await dispatch(onTheAirTvShows(1));
  }
  async function handleMostPopularClick() {
    await dispatch(isDetailsOn(false));
    await dispatch(isEpisodesPageOn(false));
    await dispatch(showStatus("popular"));
    await dispatch(mostPopularTvShows(1));
  }
  async function handleTopRatedClick() {
    await dispatch(isDetailsOn(false));
    await dispatch(isEpisodesPageOn(false));
    await dispatch(showStatus("topRated"));
    await dispatch(topRatedTvShows(1));
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
                  variant="h6"
                  color={status === "popular" ? "textPrimary" : "textSecondary"}
                  noWrap
                >
                  POPULAR
                </Typography>{" "}
              </Button>
              <Button onClick={handleNewClick}>
                <Typography
                  variant="h6"
                  color={
                    status === "onTheAir" ? "textPrimary" : "textSecondary"
                  }
                  noWrap
                >
                  NEW
                </Typography>{" "}
              </Button>
              <Button onClick={handleTopRatedClick}>
                <Typography
                  variant="h6"
                  color={
                    status === "topRated" ? "textPrimary" : "textSecondary"
                  }
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
        {showIds.map((showId) => (
          <Card key={showId} id={showId} />
        ))}
      </div>
    </>
  );
}
