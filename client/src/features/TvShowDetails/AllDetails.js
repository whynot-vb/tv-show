import React from "react";
import { useSelector } from "react-redux";

import { selectIsEpisodesPageOn } from "../../slices/showDetailsSlice";
import BasicInfo from "./BasicInfo";
import ShowImages from "./ShowImages";
import Recommended from "./Recommended";
import ActorDetails from "./ActorDetails";
import EpisodesInfo from "./EpisodesInfo";

export const selectPosterPath = (state) =>
  state?.details?.details?.details?.poster_path;

export default function AllDetails() {
  const poster_path = useSelector(selectPosterPath);
  const isEpisodesPageOn = useSelector(selectIsEpisodesPageOn);
  const myStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
    zIndex: -1,
    color: "white",
  };
  return (
    <div style={myStyle}>
      {!isEpisodesPageOn && (
        <>
          <BasicInfo />
          <ActorDetails />
          <ShowImages />
          <Recommended />
        </>
      )}
      {isEpisodesPageOn && <EpisodesInfo />}
    </div>
  );
}
