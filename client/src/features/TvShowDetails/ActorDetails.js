import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const selectActors = (state) => state?.details?.people?.cast;
export default function ActorDetails() {
  const actors = useSelector(selectActors);

  return (
    <>
      <div className="actors-text">
        <h2>ACTORS</h2>
      </div>
      <div className="actors-list">
        {actors?.map((actor) => (
          <div key={actor?.id} className="actors-container">
            <img
              src={
                actor?.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor?.profile_path}`
                  : "images/no-image.jpg"
              }
              alt="actor"
            />
            <h4>{actor?.name}</h4>
            <p>{actor?.character}</p>
          </div>
        ))}
      </div>
    </>
  );
}
