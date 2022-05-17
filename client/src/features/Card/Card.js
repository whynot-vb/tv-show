import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import noImage from "../../images/no-image.jpg";

import { idToGenre } from "../../utils/idToGenre";
import "../features.css";
import { isDetailsOn, isEpisodesPageOn } from "../../constants/actionTypes";
import {
  showDetailsTvShow,
  showActorsTvShow,
  showImagesTvShow,
  showRecommendedTvShow,
} from "../../slices/showDetailsSlice";

export const selectShowById = (state, showId) => {
  return state.shows.showList.results.find((show) => show.id === showId);
};

export default function Card({ id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const show = useSelector((state) => selectShowById(state, id));
  const handleClick = async () => {
    await dispatch(showDetailsTvShow(id));
    await dispatch(showActorsTvShow(id));
    await dispatch(showImagesTvShow(id));
    await dispatch(showRecommendedTvShow(id));
    await dispatch(isDetailsOn(true));
    await dispatch(isEpisodesPageOn(false));
  };
  return (
    <Link to={`/details/${id}`}>
      <div onClick={handleClick} className="card-container">
        <>
          <img
            src={
              show?.poster_path
                ? `https://image.tmdb.org/t/p/w200/${show?.poster_path}`
                : noImage
            }
            alt="tv-show"
          />
          <h3>{show?.name}</h3>
          <div style={{ backgroundColor: "blueviolet" }} width="100">
            <div key={id} className="average-container">
              <span>
                <FcRating /> {Math.round(show?.vote_average * 10) / 10}
              </span>
            </div>
            <p>
              {show?.genre_ids.map((id, i) => {
                if (i < 3) {
                  return (
                    <span key={id} className="genre-container">
                      <span>{idToGenre(id)}</span>
                    </span>
                  );
                }
              })}
            </p>
          </div>
        </>
      </div>
    </Link>
  );
}
