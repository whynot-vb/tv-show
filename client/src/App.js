import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SearchBar from "./features/SearchBar/SearchBar";
import Navbar from "./features/Navbar/Navbar";
import Footer from "./features/Footer/Footer";
import AllDetails from "./features/TvShowDetails/AllDetails";
import PaginationObject from "./features/Navbar/PaginationObject/PaginationObject";
import Error from "./features/Error/Error";
import { selectStatus, mostPopularTvShows } from "./slices/tvShowSlice";
import { getFavoriteShows } from "./slices/authSlice";
import "./App.css";
import Register from "./features/Register/Register";
import Favorites from "./features/Favorites/Favorites";
import EpisodesInfo from "./features/TvShowDetails/EpisodesInfo";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(mostPopularTvShows(1));
    if (user && token) dispatch(getFavoriteShows());
  }, []);

  return (
    <Router>
      <div style={{ backgroundImage: "url(/images/tv-show-motive.jpg)" }}>
        <SearchBar />
        <Switch>
          <Route exact path="/">
            <Navbar />
            <PaginationObject />
            <Footer />
          </Route>
          <Route exact path="/auth">
            <Register />
          </Route>
          <Route exact path="/details/:id">
            <AllDetails />
          </Route>
          <Route exact path="/details/episodes/:id">
            <EpisodesInfo />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/* <Router>
      <div style={{ backgroundImage: "url(/images/tv-show-motive.jpg)" }}>
        <Switch>
          <SearchBar />
          <Route exact path="/">
            <Navbar />
            <PaginationObject />
            <Footer />
          </Route>
          <Route path="/details/:id">
            <AllDetails />
          </Route>
          <Route path="/details/episode/:id">
            <EpisodesInfo />
          </Route>
          <Route exact path="/auth">
            <Register />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router> */
