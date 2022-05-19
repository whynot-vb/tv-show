import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { useDispatch, useSelector } from "react-redux";

import { setPage } from "../../../constants/actionTypes";
import {
  selectStatus,
  selectSearchResults,
  mostPopularTvShows,
  onTheAirTvShows,
  topRatedTvShows,
  searchTvShowsByName,
} from "../../../slices/tvShowSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function PaginationObject() {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const status = useSelector(selectStatus);
  const classes = useStyles();
  const handleChange = (_event, value) => {
    dispatch(setPage(value));
    if (status === "popular") {
      dispatch(mostPopularTvShows(value));
    } else if (status === "onTheAir") {
      dispatch(onTheAirTvShows(value));
    } else if (status === "topRated") {
      dispatch(topRatedTvShows(value));
    } else if (status === "search") {
      dispatch(searchTvShowsByName(searchResults, value));
    }
  };

  return (
    <div className={classes.root} style={{ marginTop: "20px" }}>
      <Pagination
        count={100}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </div>
  );
}

export default PaginationObject;
