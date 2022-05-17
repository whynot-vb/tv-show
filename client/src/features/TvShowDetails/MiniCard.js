import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import noImage from "../../images/no-image.jpg";

import {
  isDetailsOn,
  isEpisodesPageOn,
  clearElements,
} from "../../constants/actionTypes";
import "../features.css";
import {
  showDetailsTvShow,
  showActorsTvShow,
  showImagesTvShow,
  showRecommendedTvShow,
} from "../../slices/showDetailsSlice";

import { idToGenre } from "../../utils/idToGenre";

const selectRecommendedShowById = (state, showId) => {
  return state.details.recommended.results.find((show) => show.id === showId);
};

export default function MiniCard({ id }) {
  const dispatch = useDispatch();
  const show = useSelector((state) => selectRecommendedShowById(state, id));

  const handleClick = async () => {
    await dispatch(isDetailsOn(true));
    await dispatch(isEpisodesPageOn(false));
    await dispatch(showDetailsTvShow(id));
    await dispatch(showActorsTvShow(id));
    await dispatch(showImagesTvShow(id));
    await dispatch(showRecommendedTvShow(id));
    await dispatch(clearElements());
  };
  return (
    <Link to={`/details/${id}`}>
      <div className="card-container" onClick={handleClick}>
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
            {show?.genre_ids?.map((id) => {
              return (
                <span key={id} className="genre-container">
                  <span>{idToGenre(id)}</span>
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
