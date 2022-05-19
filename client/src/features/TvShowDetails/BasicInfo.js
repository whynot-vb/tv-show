import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import { showEpisodes } from "../../slices/showDetailsSlice";
import { addShowToFavorites } from "../../slices/authSlice";
import "../../features/features.css";

const selectName = (state) => state?.details?.details?.details?.name;
const selectVoteAverage = (state) =>
  state?.details?.details?.details?.vote_average;
const selectPosterPath = (state) =>
  state?.details?.details?.details?.poster_path;
const selectOverview = (state) => state?.details?.details?.details?.overview;
const selectGenres = (state) => state?.details?.details?.details?.genres;
const selectFirstAirDate = (state) =>
  state?.details?.details?.details?.first_air_date;
export const selectNumberOfSeasons = (state) =>
  state?.details?.details?.details?.number_of_seasons;
const selectNumberOfEpisodes = (state) =>
  state?.details?.details?.details?.number_of_episodes;
const selectTvShowId = (state) => state?.details?.details?.details?.id;
const selectFavoriteShows = (state) => state?.auth?.favoriteShows;
const selectUser = (state) => state?.auth?.user;
const selectToken = (state) => state?.auth?.token;

export default function BasicInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const favoriteShows = useSelector(selectFavoriteShows);
  const vote_average = useSelector(selectVoteAverage);
  const poster_path = useSelector(selectPosterPath);
  const overview = useSelector(selectOverview);
  const genres = useSelector(selectGenres);
  const first_air_date = useSelector(selectFirstAirDate);
  const numberOfSeasons = useSelector(selectNumberOfSeasons);
  const numberOfEpisodes = useSelector(selectNumberOfEpisodes);
  const tvShow_ID = useSelector(selectTvShowId);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const showInFavorites = (tvShow_ID) => {
    return (
      favoriteShows?.includes(tvShow_ID) ||
      favoriteShows?.includes(String(tvShow_ID))
    );
  };

  const handleClick = async () => {
    for (let i = 1; i <= numberOfSeasons; i++) {
      await dispatch(showEpisodes(tvShow_ID, i));
    }
    history.push(`/details/episodes/${tvShow_ID}`);
  };

  return (
    <div className="grid-container">
      <div className="show-name">
        <span>{name}</span>
        {"     "}
        <span>{vote_average}</span>
      </div>
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w400${poster_path}`}
          alt="poster"
        />
      </div>
      <div className="add-watchlist">
        {!showInFavorites(tvShow_ID) && (
          <button
            className="myButton"
            title={
              user && token
                ? "Add this show to your favorite list"
                : "Please sign in to add tv show to your favorite watchlist"
            }
            onClick={() => {
              dispatch(addShowToFavorites(tvShow_ID));
            }}
          >
            Add to my Watchlist
          </button>
        )}
        {showInFavorites(tvShow_ID) && (
          <button
            disabled={true}
            className="myButton-disabled"
            title={
              user &&
              token &&
              "Show is in your favorite list. If you want to remove it go to Favorites"
            }
          >
            Show already in favorites
          </button>
        )}
      </div>
      <div className="plot">
        <p style={{ fontSize: "16px" }}>{overview}</p>
      </div>
      <div className="genres" style={{ fontSize: "16px" }}>
        <span>Genres: {genres?.map((gen) => gen.name + " ")}</span>
      </div>
      <div className="date-season-info" style={{ fontSize: "16px" }}>
        <span>First air date:{first_air_date} </span>{" "}
        <button className="episode-button" onClick={handleClick}>
          Number of seasons:{numberOfSeasons}{" "}
        </button>{" "}
        <button className="episode-button" onClick={handleClick}>
          Number of episodes: {numberOfEpisodes}{" "}
        </button>{" "}
      </div>
    </div>
  );
}
