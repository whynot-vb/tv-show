import React from "react";
import { useSelector } from "react-redux";
import { selectPosterPath } from "./AllDetails";
import noImageE from "../../images/no-image-e.jpg";

// const selectElements = createSelector(
//   (state) => state.details,
//   (details) => details.elements
// );
const selectElements = (state) => state.details.elements;

export default function EpisodesInfo() {
  const poster_path = useSelector(selectPosterPath);
  const elements = useSelector(selectElements);
  const myStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
    zIndex: -1,
    color: "white",
  };
  return (
    <div style={myStyle}>
      {elements?.map((element) => {
        return (
          <>
            <h2 className="season-number">{element?.name}</h2>
            <div className="episode-list">
              {element?.episodes?.map((episode) => {
                return (
                  <div className="episode-container" key={episode.id}>
                    <img
                      src={
                        episode?.still_path
                          ? `https://image.tmdb.org/t/p/w200/${episode?.still_path}`
                          : noImageE
                      }
                      alt="episode"
                    />
                    <h3>{episode?.name}</h3>
                    <div style={{ backgroundColor: "blueviolet" }} width="100">
                      <p style={{ color: "white" }}>
                        {episode?.overview?.length < 120
                          ? episode?.overview
                          : episode?.overview.substring(0, 120) + "..."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
