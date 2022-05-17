import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import "../features.css";

import { removeShowFromFavorites } from "../../slices/authSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.auth.favoriteShowsDetails);

  return (
    <div className="tv-list">
      {favorites.map((show) => (
        <div className="card-container">
          <img
            src={
              show?.poster_path
                ? `https://image.tmdb.org/t/p/w200/${show?.poster_path}`
                : "images/no-image.jpg"
            }
            alt="tv-show"
          />
          <br />
          <h3>{show?.name}</h3>
          <br />
          <div style={{ backgroundColor: "blueviolet" }} width="100">
            <button
              className="remove-btn"
              onClick={() => {
                dispatch(removeShowFromFavorites(show?.id));
              }}
            >
              <Typography variant="h6" noWrap>
                REMOVE
              </Typography>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
