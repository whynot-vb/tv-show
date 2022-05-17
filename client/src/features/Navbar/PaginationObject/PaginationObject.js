import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams,
// } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showPage } from "../../../constants/actionTypes";
import {
  selectStatus,
  selectPageNumber,
  mostPopularTvShows,
  onTheAirTvShows,
  topRatedTvShows,
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
  const status = useSelector(selectStatus);
  const pageNumber = useSelector(selectPageNumber);
  const classes = useStyles();
  // const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    // setPage(value);
    if (status === "popular") {
      dispatch(mostPopularTvShows(value));
    } else if (status === "onTheAir") {
      dispatch(onTheAirTvShows(value));
    } else if (status === "topRated") {
      dispatch(topRatedTvShows(value));
    }
  };

  return (
    //    <Router>
    <div className={classes.root} style={{ marginTop: "20px" }}>
      {/* <Typography>Page: {page}</Typography> */}
      <Pagination
        count={100}
        //      page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          //            {/* <PaginationItem component={Link} to={`/${item.page}`} {...item} /> */}
          <PaginationItem {...item} />
        )}
      />
    </div>
    //    </Router>
  );
}

export default PaginationObject;
